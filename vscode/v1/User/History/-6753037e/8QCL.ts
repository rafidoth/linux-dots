import {
  Inter,
  Emilys_Candy,
  Special_Elite,
  Space_Mono,
  Exo,
  Roboto,
  Maven_Pro,
  Poppins,
  Rubik,
} from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const mavenpro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const emilysCandy = Emilys_Candy({
  subsets: ["latin"],
  weight: ["400"],
});

export const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
