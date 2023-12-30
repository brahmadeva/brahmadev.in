import React from "react";
import { SITE_TITLE, Tags } from "../../consts";

export default function Topbar() {
  const onSearchPressed = () => {
    console.log("onSearchPressed");
    alert("Search functionality is coming soon!");
  };

  return (
    <header className="z-20 w-full flex place-items-center fixed top-0 backdrop-blur-sm bg-gray/10">
      <section className="relative mx-auto w-full ">
        <nav className="flex justify-between bg-gray-900/50 text-white w-full">
          <div className="px-5 xl:px-10 py-3 flex w-full items-center">
            <a
              id="TOPBAR_SITE_TITLE"
              className="text-lg font-bold font-heading hover:text-gray-300 flex items-center"
              href="/"
            >
              <img
                src="/assets/images/brahma-icon.png"
                className="w-10 h-10 p-0.5 border rounded-full mr-2 align-middle items-center"
              />
              {SITE_TITLE}
            </a>

            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              {Tags.map((tag) => (
                <li key={tag}>
                  <a
                    className="hover:text-gray-300 capitalize"
                    href={`/tags/${tag}`}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden xl:flex items-center space-x-5">
              <button onClick={onSearchPressed}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="text-white block w-7 h-7 hover:text-gray-400"
                  stroke="currentColor"
                  fill="currentColor"
                >
                  <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                </svg>
              </button>

              {/* <button onClick={toggleSiteLanguage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="text-white block w-8 h-8 hover:text-gray-400"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="M21.056 12h-2a1 1 0 000 2v2H17.87a2.965 2.965 0 00.185-1 3 3 0 00-5.598-1.5 1 1 0 101.732 1 1 1 0 01.866-.5 1 1 0 010 2 1 1 0 000 2 1 1 0 110 2 1 1 0 01-.866-.5 1 1 0 10-1.732 1 3 3 0 005.598-1.5 2.965 2.965 0 00-.185-1h1.185v3a1 1 0 002 0v-7a1 1 0 100-2zm-11.97-.757a1 1 0 101.94-.486l-1.757-7.03a2.28 2.28 0 00-4.425 0l-1.758 7.03a1 1 0 101.94.486L5.585 9h2.94zM6.086 7l.697-2.787a.292.292 0 01.546 0L8.026 7zm7.97 0h1a1.001 1.001 0 011 1v1a1 1 0 002 0V8a3.003 3.003 0 00-3-3h-1a1 1 0 000 2zm-4 9h-1a1.001 1.001 0 01-1-1v-1a1 1 0 00-2 0v1a3.003 3.003 0 003 3h1a1 1 0 000-2z"></path>
                </svg>
              </button> */}
            </div>
          </div>

          <button
            className="hover:text-gray-200 flex mr-6 items-center xl:hidden"
            onClick={onSearchPressed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="text-white block w-7 h-7 hover:text-gray-300"
              stroke="currentColor"
              fill="currentColor"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
          </button>

          {/* <button
            className="hover:text-gray-200 flex mr-6 items-center xl:hidden"
            onClick={toggleSiteLanguage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-white block w-8 h-8 hover:text-gray-300"
              stroke="currentColor"
              fill="none"
            >
              <path d="M21.056 12h-2a1 1 0 000 2v2H17.87a2.965 2.965 0 00.185-1 3 3 0 00-5.598-1.5 1 1 0 101.732 1 1 1 0 01.866-.5 1 1 0 010 2 1 1 0 000 2 1 1 0 110 2 1 1 0 01-.866-.5 1 1 0 10-1.732 1 3 3 0 005.598-1.5 2.965 2.965 0 00-.185-1h1.185v3a1 1 0 002 0v-7a1 1 0 100-2zm-11.97-.757a1 1 0 101.94-.486l-1.757-7.03a2.28 2.28 0 00-4.425 0l-1.758 7.03a1 1 0 101.94.486L5.585 9h2.94zM6.086 7l.697-2.787a.292.292 0 01.546 0L8.026 7zm7.97 0h1a1.001 1.001 0 011 1v1a1 1 0 002 0V8a3.003 3.003 0 00-3-3h-1a1 1 0 000 2zm-4 9h-1a1.001 1.001 0 01-1-1v-1a1 1 0 00-2 0v1a3.003 3.003 0 003 3h1a1 1 0 000-2z"></path>
            </svg>
          </button> */}

          {/* <!-- <a class="navbar-burger self-center mr-12 xl:hidden" href="#"> this is burger icon</a> --> */}
        </nav>
      </section>
    </header>
  );
}
