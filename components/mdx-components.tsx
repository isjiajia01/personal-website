import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { RiInformationLine as InformationCircleIcon } from "@remixicon/react";
import React from "react";

function Indicator({
  type = "info",
  children,
}: {
  type?: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 flex items-start gap-3 rounded-md border border-zinc-200 p-4 text-[15px] leading-7 dark:border-zinc-800">
      <div
        className={classNames("shrink-0 pt-0.5", {
          "text-blue-500": type === "info",
          "text-green-500": type === "success",
          "text-orange-500": type === "warning",
          "text-red-500": type === "error",
        })}
      >
        <InformationCircleIcon className="h-5 w-5" />
      </div>
      <div className="text-zinc-900 dark:text-zinc-100">{children}</div>
    </div>
  );
}

const mdxComponents = {
  h1({ className, ...props }: React.ComponentPropsWithoutRef<"h1">) {
    return (
      <h1
        className={twMerge(
          "mb-3 mt-8 text-[15px] font-medium text-zinc-900 dark:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  h2({ className, ...props }: React.ComponentPropsWithoutRef<"h2">) {
    return (
      <h2
        className={twMerge(
          "mb-3 mt-8 text-[15px] font-medium text-zinc-900 dark:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  h3({ className, ...props }: React.ComponentPropsWithoutRef<"h3">) {
    return (
      <h3
        className={twMerge(
          "mb-2 mt-6 text-[15px] font-medium text-zinc-900 dark:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  a({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
    return (
      <a
        className={twMerge(
          "underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  p({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
    return (
      <p
        className={twMerge(
          "my-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  ul({ className, ...props }: React.ComponentPropsWithoutRef<"ul">) {
    return (
      <ul
        className={twMerge(
          "my-4 list-disc space-y-1 pl-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  ol({ className, ...props }: React.ComponentPropsWithoutRef<"ol">) {
    return (
      <ol
        className={twMerge(
          "my-4 list-decimal space-y-1 pl-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100",
          className,
        )}
        {...props}
      />
    );
  },
  img({ className, ...props }: React.ComponentPropsWithoutRef<"img">) {
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        className={twMerge(
          "my-6 rounded-md border border-zinc-200 dark:border-zinc-800",
          className,
        )}
        {...props}
      />
    );
  },
  code({ className, ...props }: React.ComponentPropsWithoutRef<"code">) {
    return (
      <code
        className={twMerge(
          "rounded bg-zinc-100 px-1 py-0.5 font-mono text-[13px] font-normal text-inherit dark:bg-zinc-800",
          "group-[.code-block]:border-none group-[.code-block]:bg-transparent group-[.code-block]:p-0",
          className,
        )}
        {...props}
      />
    );
  },
  pre({ className, ...props }: React.ComponentPropsWithoutRef<"pre">) {
    return (
      <pre
        className={twMerge(
          "group code-block my-4 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-4 text-[13px] dark:border-zinc-800 dark:bg-zinc-900",
          className,
        )}
        {...props}
      />
    );
  },
  figure({ className, ...props }: React.ComponentPropsWithoutRef<"figure">) {
    return <figure className={twMerge("my-6", className)} {...props} />;
  },
  blockquote({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"blockquote">) {
    return (
      <blockquote
        className={twMerge(
          "my-4 border-l-2 border-zinc-300 pl-4 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
          className,
        )}
        {...props}
      />
    );
  },
  Image,
  Indicator,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType<Record<string, unknown>>>;
}

export const MDXContent = ({ code, components }: MdxProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...mdxComponents, ...components }} />;
};
