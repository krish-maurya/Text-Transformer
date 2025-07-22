import React, { useState } from "react";
import Beams from "./Beams";
import {
  Type,
  FileText,
  Copy,
  RotateCcw,
  Trash2,
  AlignLeft,
  CheckCircle2,
  Upload,
} from "lucide-react";
export default function TextField() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Text transformation functions
  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleTitleCase = () => {
    const title = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setText(title);
  };

  const handleSentenceCase = () => {
    setText(text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
  };

  const handleInvertCase = () => {
    setText(
      text
        .split("")
        .map((char) =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join("")
    );
  };

  const handleRemoveSpaces = () => {
    setText(text.replace(/\s+/g, ""));
  };

  const handleClearText = () => {
    setText("");
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const wordCount =
    text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const paragraphCount = text
    .trim()
    .split(/\n\s*\n/)
    .filter((p) => p.trim()).length;

  const transformButtons = [
    { label: "UPPERCASE", action: handleUppercase, icon: Type },
    { label: "lowercase", action: handleLowercase, icon: Type },
    { label: "Title Case", action: handleTitleCase, icon: Type },
    { label: "Sentence case", action: handleSentenceCase, icon: AlignLeft },
    { label: "iNVERT cASE", action: handleInvertCase, icon: RotateCcw },
    { label: "RemoveSpaces", action: handleRemoveSpaces, icon: Type },
  ];

  return (
    <div>
      <div className="w-screen min-h-screen relative overflow-hidden ">
       <div className="absolute insert-0 -z-10 w-full h-full overflow-hidden">
         <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={46}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
       </div>
        <div className="max-w-6xl mx-auto z-10 relative px-4 mb-3">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 mt-4">Text Transformer</h1>
          <p className="text-gray-300">Transform, analyze, and manipulate your text with ease</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
          
            <div className="backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2">
                  <Upload size={20} />
                  Input Text
                </h2>
              </div>
              
              <textarea
                className="w-full h-64 p-4 backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg focus:border-blue-500 focus:outline-none transition-colors resize-none text-gray-400 leading-relaxed"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here or upload a file..."
              />
            </div>

            {/* Transform Buttons */}
            <div className="backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <RotateCcw size={20} />
                Text Transformations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {transformButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.action}
                    disabled={!text.trim()}
                    className="flex items-center justify-center gap-2 backdrop-blur bg-black/30 border border-white/20 shadow-lg px-4 py-3 rounded-lg transition-all duration-200 transform text-white hover:scale-105 font-medium"
                  >
                    <button.icon size={16} />
                    {button.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg p-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyText}
                  disabled={!text.trim()}
                  className="flex items-center gap-2 backdrop-blur bg-black/30  border border-white/20 shadow-lg  text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105  font-medium"
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>

                <button
                  onClick={handleClearText}
                  disabled={!text.trim()}
                  className="flex items-center gap-2 backdrop-blur bg-black/30  border border-white/20 shadow-lg  text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105  font-medium"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            <div className="backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-6 flex items-center gap-2">
                <FileText size={20} />
                Text Statistics
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-[#2e2e2e] border border-black/10 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{wordCount}</div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>

                <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-[#2e2e2e] border border-black/10 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{charCount}</div>
                  <div className="text-sm text-gray-600">Characters</div>
                </div>

                <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-[#2e2e2e] border border-black/10 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{charCountNoSpaces}</div>
                  <div className="text-sm text-gray-600">Characters (no spaces)</div>
                </div>

                <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-[#2e2e2e] border border-black/10 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{paragraphCount}</div>
                  <div className="text-sm text-gray-600">Paragraphs</div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            
              <div className="backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Preview</h3>
                <div className="backdrop-blur bg-black/30 rounded-2xl border border-white/20 shadow-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-gray-400 whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {text || "Your transformed text will appear here..."}
                  </p>
                </div>
              </div>
            
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
