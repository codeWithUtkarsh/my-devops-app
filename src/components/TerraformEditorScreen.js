import React, { useState } from 'react';

const TerraformEditorScreen = ({ onBack }) => {
    const [activeFile, setActiveFile] = useState('main.tf');
    const [chatMessages, setChatMessages] = useState([
        {
            type: 'system',
            content: "I've generated Terraform code for your Express.js API based on the analyzed repository structure. The infrastructure includes:",
            list: [
                'API Gateway for RESTful endpoints',
                'Lambda functions for authentication and API logic',
                'DynamoDB as a NoSQL database replacement for MongoDB',
                'Parameter Store for environment variables and secrets'
            ],
            closing: "You can edit any of the files to customize your infrastructure. What specific aspects would you like to modify?"
        },
        {
            type: 'user',
            content: "Could you update the Lambda configuration to add more memory? Also, I'd like to change the region to us-east-1."
        },
        {
            type: 'system',
            content: "I'll help you update those configurations. Here are the changes needed:",
            orderedList: [
                'In main.tf, change the region from "us-west-2" to "us-east-1"',
                'In lambda.tf, increase the memory_size parameter for both Lambda functions'
            ],
            closing: "Would you like me to make these changes for you?"
        },
        {
            type: 'user',
            content: "Yes, please update both files. And what's the estimated AWS cost for this infrastructure?"
        }
    ]);
    const [chatInput, setChatInput] = useState('');

    const files = [
        { name: 'main.tf', active: true },
        { name: 'api_gateway.tf', active: false },
        { name: 'lambda.tf', active: false },
        { name: 'dynamodb.tf', active: false },
        { name: 'variables.tf', active: false }
    ];

    const fileContents = {
        'main.tf': `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

module "api_gateway" {
  source = "./modules/api_gateway"
  name   = "serverless-api"
  stage  = var.environment
}

/* Resource blocks will be defined in separate files */`
    };

    const handleSendMessage = () => {
        if (chatInput.trim()) {
            setChatMessages([
                ...chatMessages,
                { type: 'user', content: chatInput }
            ]);
            setChatInput('');
            // In a real application, you would handle the response here
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-950 text-white">
            {/* Header */}
            <header className="flex items-center justify-between bg-gray-950 p-5 border-b border-gray-800 h-14">
                <div className="flex items-center gap-2 text-white">
                    <div className="text-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <a href="/" className="text-2xl font-semibold text-accent-500 flex items-center">
                        bolt.devops
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-gray-400 text-sm">
                        Project: <span className="text-white font-medium">serverless-api</span>
                    </div>
                    <div className="flex border border-gray-800 rounded-md overflow-hidden">
                        <button className="text-accent-500 bg-gray-900 px-4 py-1.5 text-sm font-medium">
                            Edit
                        </button>
                        <button className="text-gray-400 hover:text-white px-4 py-1.5 text-sm">
                            View
                        </button>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Content - Split View */}
            <div className="flex-1 flex">
                {/* Left Panel - Code Editor */}
                <div className="w-1/2 border-r border-gray-800 flex flex-col">
                    {/* Editor Tabs */}
                    <div className="bg-gray-900 border-b border-gray-800 flex">
                        <div className="flex-1 overflow-x-auto whitespace-nowrap flex">
                            {files.map(file => (
                                <button
                                    key={file.name}
                                    className={`${activeFile === file.name ? 'bg-gray-800 text-white' : 'text-gray-400'} px-4 py-2 text-sm flex items-center gap-2 border-r border-gray-700`}
                                    onClick={() => setActiveFile(file.name)}
                                >
                  <span className={`${activeFile === file.name ? 'text-accent-500' : 'text-gray-500'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </span>
                                    {file.name}
                                </button>
                            ))}
                        </div>
                        <button className="shrink-0 px-4 py-2 text-gray-400 hover:text-white">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 overflow-auto bg-gray-950 font-mono text-sm">
                        <div className="p-4">
              <pre className="flex">
                <div className="text-gray-500 pr-4 select-none">
                  {fileContents[activeFile]?.split('\n').map((_, i) => (
                      <div key={i} className="text-right">{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 overflow-x-auto">
                  {fileContents[activeFile]?.split('\n').map((line, i) => {
                      // Simple syntax highlighting
                      const highlightedLine = line
                          .replace(/(terraform|provider|module|resource|source|region|name|stage|version|required_providers)/g, '<span style="color: #C678DD;">$1</span>')
                          .replace(/(aws|api_gateway)/g, '<span style="color: #98C379;">$1</span>')
                          .replace(/(var\.[a-zA-Z0-9_]+)/g, '<span style="color: #61AFEF;">$1</span>')
                          .replace(/"([^"]+)"/g, '<span style="color: #E5C07B;">$1</span>')
                          .replace(/\/\*.*\*\//g, '<span style="color: #5C6370;">$&</span>');

                      return (
                          <div key={i} dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                      );
                  })}
                </div>
              </pre>
                        </div>
                    </div>

                    {/* File Explorer */}
                    <div className="border-t border-gray-800 h-1/3 bg-gray-900 flex flex-col">
                        <div className="flex items-center justify-between p-2 border-b border-gray-800">
                            <div className="text-sm font-medium">Terraform Files</div>
                            <div className="flex">
                                <button className="p-1 text-gray-400 hover:text-white">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                        <line x1="12" y1="11" x2="12" y2="17"></line>
                                        <line x1="9" y1="14" x2="15" y2="14"></line>
                                    </svg>
                                </button>
                                <button className="p-1 text-gray-400 hover:text-white ml-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="12" y1="18" x2="12" y2="12"></line>
                                        <line x1="9" y1="15" x2="15" y2="15"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-auto flex-1 p-2">
                            <div className="flex items-center text-gray-300 hover:bg-gray-800 p-1 rounded cursor-pointer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECC94B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                </svg>
                                modules/
                            </div>
                            {files.map(file => (
                                <div
                                    key={file.name}
                                    className={`flex items-center ${activeFile === file.name ? 'text-accent-500 font-medium bg-gray-800' : 'text-gray-300 hover:bg-gray-800'} p-1 rounded cursor-pointer`}
                                    onClick={() => setActiveFile(file.name)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeFile === file.name ? '#3B82F6' : '#60A5FA'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Chat & Visualization */}
                <div className="w-1/2 flex flex-col">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-auto">
                        <div className="p-4 space-y-6">
                            {chatMessages.map((message, index) => (
                                message.type === 'system' ? (
                                    <div key={index} className="bg-gray-900 rounded-lg p-4">
                                        <div className="flex items-start">
                                            <div className="bg-accent-500 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                                                    <path d="M20.96 11.5A9 9 0 1 1 11.5 2.04"></path>
                                                    <circle cx="12" cy="12" r="2.5"></circle>
                                                </svg>
                                            </div>
                                            <div className="text-sm">
                                                <p className="text-white">{message.content}</p>
                                                {message.list && (
                                                    <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                                                        {message.list.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {message.orderedList && (
                                                    <ol className="list-decimal pl-5 mt-2 text-gray-300 space-y-1">
                                                        {message.orderedList.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ol>
                                                )}
                                                {message.closing && (
                                                    <p className="mt-2 text-white">{message.closing}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} className="bg-gray-800 rounded-lg p-4 ml-8">
                                        <div className="flex items-start">
                                            <div className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </div>
                                            <div className="text-sm">
                                                <p className="text-white">{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="border-t border-gray-800 p-4">
                        <div className="relative">
              <textarea
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 pr-12 resize-none text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-500"
                  placeholder="Ask about the Terraform code or request modifications..."
                  rows={3}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
              ></textarea>
                            <button
                                className="absolute right-3 bottom-3 bg-accent-500 hover:bg-accent-600 text-white p-2 rounded-md"
                                onClick={handleSendMessage}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                            <div>Use Shift+Enter for new lines</div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-1 text-gray-400 hover:text-accent-500">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                    </svg>
                                    Enhance Prompt
                                </button>
                                <button className="flex items-center gap-1 text-gray-400 hover:text-accent-500">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
                                    </svg>
                                    Apply Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-3 px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                        <div className="text-gray-400 mr-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                            File saved
                        </div>
                        <div className="text-gray-400">
                            Region: <span className="text-white">us-west-2</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            Validate
                        </button>
                        <button
                            className="bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded-md text-sm flex items-center gap-1"
                            onClick={onBack}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="6" y1="3" x2="6" y2="15"></line>
                                <circle cx="18" cy="6" r="3"></circle>
                                <circle cx="6" cy="18" r="3"></circle>
                                <path d="M18 9a9 9 0 0 1-9 9"></path>
                            </svg>
                            Push to Repository
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TerraformEditorScreen;