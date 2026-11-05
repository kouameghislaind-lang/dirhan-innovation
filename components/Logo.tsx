import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-dirhan.png";

// Logo officiel DIRHAN INNOVATION (fichier : public/logo-dirhan.png)
// "taille" permet d'afficher le logo plus ou moins grand selon l'endroit.
type Props = {
  taille?: "normal" | "grand";
};

export default function Logo({ taille = "normal" }: Props) {
  return (
    <Link
      href="/"
      aria-label="DIRHAN INNOVATION, retour à l'accueil"
      className="inline-block transition-opacity hover:opacity-85"
    >
      <Image
        src={logo}
        alt="DIRHAN INNOVATION"
        loading="eager"
        fetchPriority="high"
        className={taille === "grand" ? "h-14 w-auto" : "h-10 w-auto sm:h-11"}
      />
    </Link>
  );
}
