import CreatePostCard from '@/components/cards/CreatePostCard';
import Posts from './components/Posts';
export const metadata = {
  title: 'Feed'
};
const Feed = () => {
  return <>
      <CreatePostCard />
      <Posts />
    </>;
};
export default Feed;