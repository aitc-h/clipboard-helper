import { useRouter } from 'next/dist/client/router';

const useQueryID = () => {
  const router = useRouter();
  const { id: __id } = router.query;
  const id = __id ? parseInt(__id) : -1;
  return id;
};

export default useQueryID;
