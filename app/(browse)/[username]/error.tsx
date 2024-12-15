"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-n-5">
      <p>Something went wrong</p>
      <button>
        <Link href="/">Go back home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
