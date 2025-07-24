// import { useCurrentQuizsetCtx } from "@/app/contexts/CurrentQuizset.context";
// import { ViewVerticalIcon } from "@radix-ui/react-icons";
// import React from "react";
// import ThemeChanger from "../ThemeChanger";
// import Logo from "../Logo";
// import { logo_path } from "@/app/config.jigao";

// type Props = {
//   sidebarOpen: boolean;
//   setSidebarOpen: (s: boolean) => void;
// };

// const Topbar = (props: Props) => {
//   return (
//     <div
//       className={`w-full h-[60px] flex justify-between items-center  mb-2 px-4 border-b border-dashed`}
//     >
//       <div>
//         <Logo src={logo_path} width={40} height={40} />
//       </div>
//       <div>
//         {!props.sidebarOpen && (
//           <ViewVerticalIcon
//             onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
//             className={`cursor-pointer
//               hover:text-white/50
//               w-6 h-6`}
//           />
//         )}
//       </div>
//       <ThemeChanger />
//     </div>
//   );
// };

// export default Topbar;
