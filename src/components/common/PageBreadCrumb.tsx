import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle1: string;
  pageTitle2: string | null;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle1, pageTitle2 }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {!pageTitle2 ? pageTitle1 : pageTitle2 + " " + pageTitle1 /*.slice(0, -1)*/}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link 
              href={"/" + pageTitle1.toLocaleLowerCase()} 
              className={`inline-flex items-center gap-1.5 text-sm ${pageTitle2 ? "text-gray-500" : "text-gray-800 font-semibold"} dark:text-white/90`}>
              {pageTitle1}
              {pageTitle2 && (
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link 
              href={"/" + pageTitle1.toLocaleLowerCase() + "/" + pageTitle2?.toLocaleLowerCase()} 
              className="text-sm text-gray-800 font-semibold dark:text-white/90">
              {pageTitle2}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
