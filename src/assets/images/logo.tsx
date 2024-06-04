interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      width={49}
      height={48}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.984 29.29a17.209 17.209 0 0117.21-17.21v17.21H1.985z"
        className="ccustom"
        fill="#442781"
      />
      <path
        d="M1.984 29.29a17.21 17.21 0 0017.21 17.21V29.29H1.985z"
        className="ccompli1"
        fill="#61459C"
      />
      <path
        d="M36.404 29.29a17.212 17.212 0 01-10.624 15.9 17.209 17.209 0 01-6.585 1.31V29.29h17.21z"
        className="ccompli2"
        fill="#A992DB"
      />
      <path
        d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922z"
        className="ccustom"
        fill="#FF7917"
      />
    </svg>
  );
}
