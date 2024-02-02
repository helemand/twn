import axios from "axios";
import Image from "../components/Image";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useFetchData } from "../hooks/useFetchData";
import { ImageType } from "../types";

type Article = {
  body: string;
  image: ImageType;
  intro: string;
  tags: string[];
  title: string;
};

const Article = () => {
  const { id } = useParams();

  const { isPending, error, data } = useFetchData<Article>({
    queryKey: ["articleData", id as string],
    queryFn: async () => {
      const response = await axios.get<Article>(
        `https://midaiganes.irw.ee/api/list/${id || "972d2b8a"}`
      );
      return response.data;
    },
  });

  if (isPending) return <Loader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container">
      <div className="inner">
        <h1>{data.title}</h1>
        <div
          className="intro"
          dangerouslySetInnerHTML={{ __html: data.intro }}
        ></div>
        <Image
          url={data.image.large}
          alt={data.image.alt}
          title={data.image.title}
        />
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
        {data.tags.map((tag: string, i: number) => (
          <div key={tag + i} className="chip">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
