import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import StreamPlayer from "@/components/stream-player";
import Footer from "@/components/footer";
import Header from "@/components/navbar";

interface PageProps {
  params: Promise<{ username: string }>;
}

interface UserPageProps extends PageProps {
  params: Promise<{ username: string }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <>
      <Header/>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
      <Footer />
    </>
  );
};

export default UserPage;
