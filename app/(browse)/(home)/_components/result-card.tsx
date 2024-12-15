import Link from "next/link";

import Thumbnail, { ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatarSkeleton } from "@/components/user-avatar";
import { Timer, User } from "lucide-react";

type User = {
  id: string;
  username: string;
  imageUrl: string;
  externalUserId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-2 border border-n-3/40 rounded-lg pb-2">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="flex gap-x-3 mx-2 py-1 border-b border-n-3/40">
          <p className="truncate font-semibold text-xs text-primary-2">
            {data.user.username}
          </p>
          <div className="flex items-center gap-2 ml-auto">
            {/* age */}
            <p className="text-xs font-semibold text-n-2">19</p>
            {/* gender */}
            <User fill="pink" size={16} color="pink" />
          </div>
        </div>
        <div className="flex flex-col mx-2 py-1">
          {/* goal */}
          <p className="text-[11px] text-n-1 leading-4 mb-2">my goal is to make 20,000 by the end of the stream</p>
          <div className="flex items-center">
            <Timer size={14} fill="#D9D9D9" color="#D9D9D9"/>
            <p className="text-[10px] text-n-3 ml-2"><span>8.2</span>hrs, <span>20001 </span>viewers</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
