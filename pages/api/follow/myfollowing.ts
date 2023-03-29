const myFollowings = await prisma.follow.findMany({
  where: { followerId: userId },
});
