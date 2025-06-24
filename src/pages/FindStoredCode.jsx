import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindStoredCode() {
  const [formText, setFormText] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  function handleChange(event) {
    setFormText(event.target.value);
    setErrorText('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formText !== '') {
      navigate(`/snippets/${formText}`);
    } else {
      setErrorText('Enter your code ID');
    }
  }

  return (
    <>
      <div>
        <div className="my-10">
          <div className="text-center">
            <h1>
              <a href="/">
                <img src="images/NoteCodeLogo.svg" alt="" className="mx-auto" />
              </a>
            </h1>
            <p className="mb-6 text-3xl mt-7">Load Your Saved Code</p>
            <p className="mb-10 text-4xl">Enter Your Code ID</p>
          </div>

          <div className="p-5 mx-7 md:mx-20 lg:mx-25 ">
            <div className="md:mx-10">
              <form action="">
                <div className="mb-4">
                  <input
                    onChange={handleChange}
                    type="text"
                    name=""
                    id=""
                    className="bg-white border border-[#406AFF] outline-0  w-full p-4"
                    value={formText}
                  />
                  <span className="text-red-600">{errorText}</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-[#406AFF] text-white flex items-center gap-1 py-2 px-5 cursor-pointer mx-auto"
                >
                  Load Code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindStoredCode;
