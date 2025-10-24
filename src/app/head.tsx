import { socialLinks } from "@/config/site";

export default function Head() {
  return (
    <>
      {socialLinks.map((s) => (
        <link key={s.href} rel="me" href={s.href} />
      ))}
    </>
  );
}

