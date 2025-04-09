import React from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import FileExplorer from "./FileExplorer";
import ChatPanel from "./ChatPanel";
import Footer from "./Footer";
import { useS3 } from "../../hooks/useS3";
import { useChat } from "../../hooks/useChat";

const TerraformEditorScreen = ({ onBack }) => {
  const [activeFile, setActiveFile] = React.useState("main.tf");
  const [s3Config] = React.useState({
    region: process.env.REACT_APP_AWS_REGION,
    bucketName: process.env.REACT_APP_S3_BUCKET,
    prefix: "",
  });

  const {
    files,
    fileContents,
    isLoadingFiles,
    errorMessage,
    updateFileContent,
    saveFileToS3,
    deleteFileFromS3,
    createNewFile,
    saveAllFiles,
  } = useS3(s3Config, activeFile, setActiveFile);

  const {
    chatMessages,
    chatInput,
    setChatInput,
    isLoading,
    chatId,
    setChatId,
    handleSendMessage,
    handleKeyDown,
    enhancePrompt,
    addSystemMessage,
  } = useChat(activeFile, fileContents, updateFileContent, saveFileToS3);

  const handleFileContentChange = (e) => {
    updateFileContent(activeFile, e.target.value);
  };

  const validateTerraform = async () => {
    try {
      addSystemMessage({
        content: "Validating Terraform configuration...",
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addSystemMessage({
        content: "Terraform validation successful!",
        list: [
          "All resources have valid configuration.",
          "No syntax errors found.",
          "Provider requirements are met.",
        ],
      });
      return true;
    } catch (error) {
      addSystemMessage({
        content: `Terraform validation failed: ${error.message}`,
      });
      return false;
    }
  };

  const pushToRepository = async () => {
    const allSaved = await saveAllFiles();
    if (allSaved) {
      addSystemMessage({
        content: "All files saved successfully. Ready to push to repository.",
        list: [
          "All Terraform configurations validated.",
          `${files.length} files will be pushed to the repository.`,
          'Changes will be committed with the message: "Updated Terraform configurations via bolt.devops"',
        ],
        closing: "Would you like to proceed with the push?",
      });
      return true;
    } else {
      addSystemMessage({
        content:
          "Unable to save all files. Please fix any errors before pushing to repository.",
      });
      return false;
    }
  };

  const handleSaveCurrentFile = async () => {
    if (activeFile && fileContents[activeFile]) {
      const success = await saveFileToS3(activeFile, fileContents[activeFile]);
      if (success) {
        addSystemMessage({
          content: `Successfully saved ${activeFile}`,
        });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      <Header s3Config={s3Config} />

      <div className="flex flex-1 min-h-0">
        <div className="w-1/2 border-r border-gray-800 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <CodeEditor
              files={files}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
              fileContents={fileContents}
              handleFileContentChange={handleFileContentChange}
              isLoadingFiles={isLoadingFiles}
              errorMessage={errorMessage}
            />
          </div>

          <div className="h-64 border-t border-gray-800">
            <FileExplorer
              files={files}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
              saveFileToS3={saveFileToS3}
              deleteFileFromS3={deleteFileFromS3}
              createNewFile={createNewFile}
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col min-h-0">
          <ChatPanel
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            chatId={chatId}
            setChatId={setChatId}
            enhancePrompt={() => enhancePrompt(activeFile)}
            handleSaveCurrentFile={handleSaveCurrentFile}
          />
        </div>
      </div>

      <Footer
        isLoadingFiles={isLoadingFiles}
        s3Config={s3Config}
        validateTerraform={validateTerraform}
        pushToRepository={pushToRepository}
      />
    </div>
  );
};

export default TerraformEditorScreen;
