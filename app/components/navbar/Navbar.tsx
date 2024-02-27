"use client";

import Image from "next/image";
import Link from "next/link";

import { sidebarActive } from "@/app/atoms/sideBarAtoms";
import { useAtom } from "jotai";

import about from "../../../public/icons/about.png";
import contact from "../../../public/icons/contact.png";
import darkMode from "../../../public/icons/darkMode.png";
import feedback from "../../../public/icons/feedback.png";
import home from "../../../public/icons/home.png";
import leaderboards from "../../../public/icons/leaderboards.png";
import mute from "../../../public/icons/mute.png";
import logo from "../../../public/icons/sandwhich-logo.png";
import tribunal from "../../../public/icons/tribunal.png";

export default function Navbar() {
  const [sidebarToggle, setsidebarToggle] = useAtom(sidebarActive);

  return (
    <div className="sticky top-0 z-10 flex h-[60px] items-center bg-primary">
      <div
        onClick={() => setsidebarToggle((prevToggle) => !prevToggle)}
        className={`${
          sidebarToggle ? "block" : "hidden"
        } fixed left-0 top-0 z-0 h-screen w-screen backdrop-brightness-50`}
      ></div>

      <nav className="flex h-9 w-screen items-center">
        <button
          onClick={() => setsidebarToggle((prevToggle) => !prevToggle)}
          className="group relative ml-3 flex h-full w-9 items-center justify-center"
        >
          <label className="z-10 block h-0.5 w-5 cursor-pointer bg-secondary before:absolute before:bottom-2.5 before:block before:h-0.5 before:w-5 before:bg-secondary before:content-[''] after:absolute after:top-2.5 after:block after:h-0.5 after:w-5 after:bg-secondary after:content-['']"></label>
          <span className="absolute h-full w-full rounded-full group-hover:bg-hoverGray"></span>
        </button>
        <Image
          className="ml-2 invert"
          height={30}
          width={30}
          src={logo}
          alt="Picture of SandWhich logo"
        />
        <h1 className="ml-1 text-2xl font-bold">SandWhich</h1>
      </nav>

      <nav
        className={`${
          sidebarToggle ? "translate-x-[248px]" : "translate-x-0"
        } fixed -left-[248px] top-0 z-10 h-screen w-[248px] bg-primary py-3 transition-transform`}
      >
        <div className="flex h-9 w-full items-center border-b-black">
          <button
            onClick={() => setsidebarToggle((prevToggle) => !prevToggle)}
            className="group relative ml-3 flex h-full w-9 items-center justify-center"
          >
            <label className="z-10 block h-0.5 w-5 cursor-pointer bg-secondary before:absolute before:bottom-2.5 before:block before:h-0.5 before:w-5 before:bg-secondary before:content-[''] after:absolute after:top-2.5 after:block after:h-0.5 after:w-5 after:bg-secondary after:content-['']"></label>
            <span className="absolute h-full w-full rounded-full group-hover:bg-hoverGray"></span>
          </button>
          <Image
            className="ml-2 invert"
            height={30}
            width={30}
            src={logo}
            alt="SandWhich logo"
          />
          <h1
            className={`ml-1 text-2xl font-bold transition-opacity ease-in-out`}
          >
            SandWhich
          </h1>
        </div>
        <div className="mb-2 px-3 pt-2">
          <ul className="flex flex-col pb-3">
            <Link
              href="/home"
              className={`my-2 flex h-12 items-center rounded-xl bg-hoverGray p-3 font-bold transition-opacity ease-in-out`}
            >
              <Image
                className="mr-2 invert"
                height={25}
                width={25}
                src={home}
                alt="Home icon"
              />
              Home
            </Link>

            <Link
              href="/leaderboards"
              className={`mb-2 flex h-12 items-center rounded-xl p-3 font-bold transition-opacity ease-in-out hover:bg-hoverGray`}
            >
              <Image
                className="mr-2 invert"
                height={25}
                width={25}
                src={leaderboards}
                alt="Leaderboards icon"
              />
              Leaderboards
            </Link>

            <Link
              href="/tribunal"
              className={`mb-2 flex h-12 items-center rounded-xl p-3 font-bold transition-opacity ease-in-out hover:bg-hoverGray`}
            >
              <Image
                className="mr-2 invert"
                height={25}
                width={25}
                src={tribunal}
                alt="Sandwhich Tribunal icon"
              />
              Sandwhich Tribunal
            </Link>

            <Link
              href="/about"
              className={`mb-2 flex h-12 items-center rounded-xl p-3 font-bold transition-opacity ease-in-out hover:bg-hoverGray`}
            >
              <Image
                className="mr-2 invert"
                height={25}
                width={25}
                src={about}
                alt="About icon"
              />
              About
            </Link>

            <Link
              href="/contact"
              className={`mb-2 flex h-12 items-center rounded-xl p-3 font-bold transition-opacity ease-in-out hover:bg-hoverGray`}
            >
              <Image
                className="mr-2 invert"
                height={25}
                width={25}
                src={contact}
                alt="Contact icon"
              />
              Contact
            </Link>

            <Link
              href="/feedback"
              className={`flex h-12 items-center rounded-xl p-3 font-bold transition-opacity ease-in-out hover:bg-hoverGray`}
            >
              <Image
                className="mr-2 invert"
                height={25}
                width={25}
                src={feedback}
                alt="Send Feedback icon"
              />
              Send Feedback
            </Link>
          </ul>
          <div className="m-auto h-1 w-11/12 rounded-xl bg-gray-500"></div>
        </div>
        <div className="mb-6 flex w-full flex-col items-center justify-evenly px-3 pt-2">
          <button className="mb-2 flex w-11/12 items-center rounded-md border-2 border-black font-bold hover:bg-hoverGray">
            <Image
              className="mr-1 invert"
              height={35}
              width={35}
              src={darkMode}
              alt="Dark Mode icon"
            />
            Dark Mode
          </button>
          <button className="flex w-11/12 items-center rounded-md border-2 border-black font-bold hover:bg-hoverGray">
            <Image
              className="mr-1 invert"
              height={35}
              width={35}
              src={mute}
              alt="Mute icon"
            />
            Mute
          </button>
        </div>
      </nav>
    </div>
  );
}
