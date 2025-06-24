import { Editor } from '@monaco-editor/react';
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function StoredCode() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [language, setLanguage] = useState('html');
  const [dark, setDark] = useState('vs');

  const { id } = useParams();
  //   const [savedCode, setSavedCode] = useState('');
  const [code, setCode] = useState('');
  const [shared, setShared] = useState(true);

  const backendAPI = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const handleresize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleresize);

    return () => window.removeEventListener('resize', handleresize);
  });

  function handleEditorChange(value) {
    setCode(value);
    setShared(false);
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  function handleDarkChage(event) {
    setDark(event.target.value);
  }

  useEffect(() => {
    async function fetchSnippets() {
      const res = await axios.get(`${backendAPI}/api/snippets/${id}`, {
        headers: {
          'x-api-key': import.meta.env.VITE_FRONTEND_API_KEY,
        },
      });
      const data = res.data;
      console.log(data);
      setCode(data);
      //   setSavedCode(data);
    }
    fetchSnippets();
  }, [id]);

  async function handleSubmit() {
    try {
      console.log(code);
      const res = await axios.put(
        `${backendAPI}/api/snippets/${id}`,
        {
          code: code,
        },
        {
          headers: {
            'x-api-key': import.meta.env.VITE_FRONTEND_API_KEY,
          },
        }
      );
      alert(res.data);
      setShared(true);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error Updating');
    }
  }

  async function handleCopyClick() {
    try {
      navigator.clipboard.writeText(id);
    } catch (err) {
      console.error(`Error in Copying ${err}`);
    }
  }

  return (
    <>
      <div className="my-10">
        <div className="text-center">
          <h1>
            <a href="/">
              <img src="images/NoteCodeLogo.svg" alt="" className="mx-auto" />
            </a>
          </h1>
          <p className="mb-6 text-3xl mt-7">Create & Share</p>
          <p className="mb-10 text-4xl">Your Code easily</p>
        </div>

        <div className="p-5 bg-white rounded-2xl mx-7 md:mx-20 lg:mx-25 ">
          <Editor
            language={language}
            height="500px"
            options={{
              padding: { top: 25, bottom: 20 },
              scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
              automaticLayout: true,
              overviewRulerLanes: 0,
              //   scrollBeyondLastLine: false,
              minimap: { enabled: !isMobile },
              folding: true,
              showFoldingControls: 'always',
              foldingHighlight: true,
            }}
            value={code}
            theme={dark}
            // defaultValue={savedCode}
            onChange={handleEditorChange}
          />

          {/* Button Section */}

          <div className="flex items-center justify-between">
            <div className="text-[10px]">
              <select
                name=""
                id=""
                className="bg-[#CED6E1] rounded-full outline-0 p-2 cursor-pointer"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">Javascript</option>
                <option value="xml">XML</option>
              </select>

              <select
                name=""
                id=""
                className="bg-[#CED6E1] rounded-full outline-0 p-2 pl-3 mx-3 cursor-pointer"
                onChange={handleDarkChage}
              >
                <option value="vs">Light</option>
                <option value="vs-dark">Dark</option>
              </select>
            </div>

            {/* Share and Copy Section */}

            <div className="flex flex-row items-center gap-x-3">
              <div
                onClick={handleCopyClick}
                className="hidden sm:flex cursor-pointer"
              >
                <p className="mr-2">Click To Copy ID</p>
                <img src="/images/link.svg" alt="" />
              </div>

              <button
                onClick={handleSubmit}
                className={`${!shared ? 'bg-[#406AFF]' : 'bg-[#364153]'} text-white flex items-center gap-1 py-2 px-5 rounded-full cursor-pointer`}
                disabled={shared}
              >
                <img src="/images/Share.svg" alt="" />
                <p>Share</p>
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Link to="/findstoredcode">
              <button className="bg-[#406AFF] text-white flex items-center gap-1 py-2 px-5 rounded-full cursor-pointer">
                Open Saved Code
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoredCode;
