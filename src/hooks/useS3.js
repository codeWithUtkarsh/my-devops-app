import { useState, useEffect } from "react";
import AWS from "aws-sdk";

export const useS3 = (s3Config, activeFile, setActiveFile) => {
  const [files, setFiles] = useState([]);
  const [fileContents, setFileContents] = useState({});
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Initialize AWS S3 client
  useEffect(() => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      }),
    });
  }, []);

  // Load files from S3 bucket
  useEffect(() => {
    const loadFilesFromS3 = async () => {
      setIsLoadingFiles(true);
      setErrorMessage("");

      try {
        const s3 = new AWS.S3();
        const listParams = {
          Bucket: process.env.REACT_APP_S3_BUCKET,
          Prefix: s3Config.prefix,
        };

        const data = await s3.listObjectsV2(listParams).promise();

        if (data.Contents) {
          const tfFiles = data.Contents.filter((item) =>
            item.Key.endsWith(".tf"),
          ).map((item) => ({
            name: item.Key.split("/").pop(),
            key: item.Key,
            active: false,
          }));

          if (tfFiles.length > 0) {
            tfFiles[0].active = true;
            setActiveFile(tfFiles[0].name);
          }

          setFiles(tfFiles);

          const contents = {};
          for (const file of tfFiles) {
            const fileParams = {
              Bucket: process.env.REACT_APP_S3_BUCKET,
              Key: file.key,
            };

            const fileData = await s3.getObject(fileParams).promise();
            contents[file.name] = fileData.Body.toString("utf-8");
          }

          setFileContents(contents);
        }
      } catch (error) {
        console.error("Error loading files from S3:", error);
        setErrorMessage(`Failed to load files from S3: ${error.message}`);
        setFiles([]);
        setFileContents({});
      } finally {
        setIsLoadingFiles(false);
      }
    };

    loadFilesFromS3();
  }, [s3Config, setActiveFile]);

  const saveFileToS3 = async (fileName, content) => {
    try {
      const s3 = new AWS.S3();
      const fileKey = `${s3Config.prefix}${fileName}`;

      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: fileKey,
        Body: content,
        ContentType: "text/plain",
      };

      await s3.putObject(params).promise();
      return true;
    } catch (error) {
      console.error("Error saving file to S3:", error);
      setErrorMessage(`Failed to save file: ${error.message}`);
      return false;
    }
  };

  const deleteFileFromS3 = async (fileName) => {
    try {
      const s3 = new AWS.S3();
      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `${s3Config.prefix}${fileName}`,
      };

      await s3.deleteObject(params).promise();

      setFiles(files.filter((f) => f.name !== fileName));
      if (activeFile === fileName) {
        const nextFile = files.find((f) => f.name !== fileName);
        if (nextFile) {
          setActiveFile(nextFile.name);
        }
      }

      const newFileContents = { ...fileContents };
      delete newFileContents[fileName];
      setFileContents(newFileContents);

      return true;
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      setErrorMessage(`Failed to delete file: ${error.message}`);
      return false;
    }
  };

  const createNewFile = async (fileName) => {
    if (!fileName.endsWith(".tf")) {
      return { success: false, message: "File name must end with .tf" };
    }

    const success = await saveFileToS3(fileName, "");
    if (success) {
      setFiles((prev) => [...prev, { name: fileName, active: false }]);
      setActiveFile(fileName);
      return { success: true };
    }
    return { success: false, message: "Failed to create file" };
  };

  const updateFileContent = (fileName, newContent) => {
    setFileContents((prev) => ({
      ...prev,
      [fileName]: newContent,
    }));
  };

  const saveAllFiles = async () => {
    let allSaved = true;
    for (const file of files) {
      const success = await saveFileToS3(file.name, fileContents[file.name]);
      if (!success) {
        allSaved = false;
        break;
      }
    }
    return allSaved;
  };

  return {
    files,
    fileContents,
    isLoadingFiles,
    errorMessage,
    messages,
    updateFileContent,
    saveFileToS3,
    deleteFileFromS3,
    createNewFile,
    saveAllFiles,
  };
};
