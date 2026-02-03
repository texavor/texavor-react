"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeftToLine,
  Binoculars,
  Blocks,
  LayoutDashboardIcon,
  ListTree,
  Microscope,
  Paperclip,
  Settings,
  ArrowRightToLine,
  MessageCircleQuestion,
  Newspaper,
  TableOfContents,
  ExternalLink,
  LogOutIcon,
  Target,
  Bookmark,
  ImageIcon,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

// --- MOCKED HOOKS & DATA ---
const usePermissions = () => ({
  role: "admin",
  research_tools: true,
  settings: true,
});
const useAppStore = () => ({
  blogs: { name: "Demo Blog", website_url: "https://demo.com" },
  mainLoading: false,
});

const SideBarGeneral = [
  {
    icon: <LayoutDashboardIcon className="h-4 w-4" />,
    title: "Dashboard",
    id: "dashboard",
  },
  {
    icon: <Paperclip className="h-4 w-4" />,
    title: "Article",
    id: "article",
  },
  {
    icon: <Bookmark className="h-4 w-4" />,
    title: "Saved",
    id: "saved",
  },
];

const SideBarResearch = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "Keyword Discovery",
    id: "keyword-discovery",
  },
  {
    icon: <Binoculars className="h-4 w-4" />,
    title: "Keyword Research",
    id: "keyword-research",
  },
  {
    icon: <Microscope className="h-4 w-4" />,
    title: "Topic Generation",
    id: "topic-generation",
  },
  {
    icon: <ListTree className="h-4 w-4" />,
    title: "Outline Generator",
    id: "outline-generation",
  },
  {
    icon: <Target className="h-4 w-4" />,
    title: "Competitor Analysis",
    id: "competitor-analysis",
  },
];

const SideBarOptionSettings = [
  {
    icon: <Blocks className="h-4 w-4" />,
    title: "Integrations",
    id: "integrations",
  },
  {
    icon: <ImageIcon className="h-4 w-4" />,
    title: "Thumbnail Styles",
    id: "thumbnail-styles",
  },
  {
    icon: <Settings className="h-4 w-4" />,
    title: "Settings",
    id: "settings",
  },
  {
    icon: <Users className="h-4 w-4" />,
    title: "Team",
    id: "team",
  },
];

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  id?: string;
  isSideOpen: boolean;
  external?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}

const SidebarItem = ({
  icon,
  title,
  id,
  isSideOpen,
  external,
  isActive,
  onClick,
}: SidebarItemProps) => {
  const button = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`flex cursor-pointer w-full hover:bg-[#f9f4f0] ${
        isSideOpen ? "justify-start gap-2" : "justify-center"
      } ${isActive ? "bg-[#f9f4f0]" : ""}`}
      onClick={onClick}
    >
      <div className={`shrink-0 ${isActive ? "text-[#104127]" : ""}`}>
        {icon}
      </div>
      {isSideOpen && (
        <p className="font-poppins font-base whitespace-nowrap">{title}</p>
      )}
      {external && isSideOpen && (
        <ExternalLink className="size-3 stroke-2 text-black ml-auto" />
      )}
    </Button>
  );

  if (isSideOpen) {
    return <div className="w-full">{button}</div>;
  }

  // When sidebar is closed, wrap in Tooltip
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-full">{button}</div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface DemoSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const DemoSidebar = ({ activeView, onNavigate }: DemoSidebarProps) => {
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const { blogs, mainLoading } = useAppStore();
  const { role, research_tools, settings } = usePermissions();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div
      className={`h-full flex flex-col justify-between p-4 gap-4 transition-all ease-in-out duration-300 border-r border-gray-100 bg-white ${
        isSideOpen ? "min-w-[250px]" : "w-[78px]"
      }`}
    >
      {/* --- TOP BLOG CARD --- */}
      <div className="bg-white p-2 rounded-xl w-full min-h-12 flex flex-col justify-center">
        {isSideOpen ? (
          <div className="flex justify-between w-full items-center px-2">
            {mainLoading ? (
              <div className="flex gap-2 items-center">
                <Skeleton className="rounded-full h-6 w-6 bg-[#f9f4f0]" />
                <Skeleton className="w-[100px] h-[20px] rounded-xl bg-[#f9f4f0]" />
              </div>
            ) : (
              <div className="flex gap-2 items-center overflow-hidden">
                <Avatar className="rounded-full shrink-0 h-6 w-6">
                  <AvatarFallback className="bg-[#104127] text-white text-[10px] flex items-center justify-center">
                    DB
                  </AvatarFallback>
                </Avatar>
                <p className="font-medium font-poppins truncate flex-1 text-sm text-gray-700">
                  Demo Blog
                </p>
              </div>
            )}
            <div
              className="cursor-pointer"
              onClick={() => setIsSideOpen(!isSideOpen)}
            >
              <ArrowLeftToLine className="h-4 w-4 stroke-2 text-gray-400 hover:text-gray-600" />
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center cursor-pointer group"
            onClick={() => setIsSideOpen(!isSideOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-[#f9f4f0] flex items-center justify-center text-[#104127] font-bold text-xs">
              DB
            </div>
          </div>
        )}
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <div className="bg-white px-2 rounded-xl w-full flex-grow overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* General Group */}
        {isSideOpen && (
          <p className="px-4 py-2 text-[10px] font-bold text-gray-400 font-poppins tracking-wider">
            GENERAL
          </p>
        )}
        <div className="space-y-0.5 flex flex-col pb-2">
          {SideBarGeneral.map((sidebar) => (
            <SidebarItem
              key={sidebar.title}
              {...sidebar}
              isSideOpen={isSideOpen}
              isActive={activeView === sidebar.id}
              onClick={() => onNavigate(sidebar.id)}
            />
          ))}
        </div>

        {/* Research Group */}
        {research_tools && SideBarResearch.length > 0 && (
          <>
            {!isSideOpen && (
              <div className="border-b-[1px] mx-2 my-2 border-gray-100" />
            )}
            {isSideOpen && (
              <p className="px-4 py-2 text-[10px] font-bold text-gray-400 font-poppins mt-2 tracking-wider">
                RESEARCH
              </p>
            )}
            <div className="space-y-0.5 flex flex-col pb-2">
              {SideBarResearch.map((sidebar) => (
                <SidebarItem
                  key={sidebar.title}
                  {...sidebar}
                  isSideOpen={isSideOpen}
                  isActive={activeView === sidebar.id}
                  onClick={() => onNavigate(sidebar.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Settings Group */}
        {SideBarOptionSettings.length > 0 && (
          <>
            {!isSideOpen && (
              <div className="border-b-[1px] mx-2 my-2 border-gray-100" />
            )}
            {isSideOpen && (
              <p className="px-4 py-2 text-[10px] font-bold text-gray-400 font-poppins mt-2 tracking-wider">
                SETTINGS
              </p>
            )}
            <div className="space-y-0.5 flex flex-col pb-2">
              {SideBarOptionSettings.map((sidebar) => (
                <SidebarItem
                  key={sidebar.title}
                  {...sidebar}
                  isSideOpen={isSideOpen}
                  isActive={activeView === sidebar.id}
                  onClick={() => onNavigate(sidebar.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-100 pt-2 px-2">
        <Button
          variant="ghost"
          className={`w-full hover:bg-red-50 text-red-500 hover:text-red-600 flex gap-2 ${
            isSideOpen ? "justify-start" : "justify-center"
          }`}
          onClick={() => console.log("Logout clicked")}
        >
          <LogOutIcon className="size-4 shrink-0" />
          {isSideOpen && (
            <p className="font-poppins text-xs font-medium">Logout</p>
          )}
        </Button>
      </div>
    </div>
  );
};
