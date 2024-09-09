import React, { useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";

function Pass() {
  const [range, setRange] = useState(6);
  const [password, setPassword] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState("");

  const handleR = (e) => {
    const newRange = parseInt(e.target.value);
    setRange(newRange);
    generatePassword(newRange);
  };

  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
    generatePassword(range);
  };

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const generatePassword = (length) => {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    let allChars = "";
    if (includeUppercase) allChars += upperCaseChars;
    if (includeLowercase) allChars += lowerCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSpecial) allChars += specialChars;

    if (allChars.length === 0) return;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    if (generatedPassword.length < 4) {
      setLength("weak");
    } else if (generatedPassword.length < 6) {
      setLength("fair");
    } else {
      setLength("strong");
    }

    setPassword(generatedPassword);
  };

  return (
    <main>
      <div className="bg-white p-4 shadow-lg flex flex-col m-[1rem] rounded-md items-center justify-center">
        <GiPadlock size={50} className="text-[rgb(48,151,148)]" />

        <div className="flex gap-2 border-2 border-black p-2 rounded-md mt-2">
          <span className="text-[#309794]">X</span> X{" "}
          <span className="text-[#309794]">X</span>X
        </div>

        <article className="mt-4 text-center">
          <h1 className="md:text-4xl text-2xl font-[700]">
            Password Generator
          </h1>
          <h2 className="font-text text-[15px] font-[500] mt-2">
            Create a strong and secure password to stay safe
          </h2>
        </article>

        <section className="flex justify-between gap-4 mt-8 items-center">
          <article className="flex flex-col justify-center items-center">
            <div className="border-2 border-black w-[200px] text-center rounded-md p-2">
              {password || "Generate"}
            </div>
            <p
              className={`
                ${length === "fair" ? "text-yellow-500" : ""}
                ${length === "strong" ? "text-green-500" : ""}
                ${length === "weak" ? "text-red-500" : ""}
              `}
            >
              {length}
            </p>
          </article>
          <div>
            <button
              className="flex items-center bg-[#309794] text-white p-2 rounded-md hover:bg-[#25787d]"
              onClick={() => copyToClipboard(password)}
            >
              <FaCopy className="mr-2" />
              Copy
            </button>
          </div>
        </section>

        {copied && (
          <div className="mt-4 bg-[#accfce] absolute top-0 p-4 font-text ">
            Password copied!
          </div>
        )}

        <footer className="self-start w-full mt-8">
          <p>Password length: {range}</p>
          <input
            onChange={handleR}
            aria-label="Password length"
            type="range"
            className="slider"
            min="1"
            max="16"
            value={range}
          />

          <div className="flex justify-between">
            <p>Uppercase</p>
            <input
              type="checkbox"
              className="check"
              checked={includeUppercase}
              onChange={handleCheckboxChange(setIncludeUppercase)}
            />
          </div>

          <div className="flex justify-between">
            <p>Lowercase</p>
            <input
              type="checkbox"
              className="check"
              checked={includeLowercase}
              onChange={handleCheckboxChange(setIncludeLowercase)}
            />
          </div>

          <div className="flex justify-between">
            <p>Numbers</p>
            <input
              type="checkbox"
              className="check"
              checked={includeNumbers}
              onChange={handleCheckboxChange(setIncludeNumbers)}
            />
          </div>

          <div className="flex justify-between">
            <p>Special characters</p>
            <input
              type="checkbox"
              className="check"
              checked={includeSpecial}
              onChange={handleCheckboxChange(setIncludeSpecial)}
            />
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Pass;
