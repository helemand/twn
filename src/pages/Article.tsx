import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Loader from "../components/Loader";
import { getArticleData } from "../api";
import Image from "../components/Image";

const Article = () => {
  const { id } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["articleData", id],
    queryFn: () => getArticleData(id || "972d2b8a"),
    throwOnError: true,
  });

  if (isPending || !data) return <Loader />;

  return (
    <>
      <h1 aria-label={data.title}>{data.title}</h1>
      <div
        className="intro"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.intro) }}
      />
      <Image
        url={data.image.large}
        alt={data.image.alt}
        title={data.image.title}
      />
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.body) }}
      />
      {data.tags
        .map((tag, i) => ({ tag, key: `${tag}-${i}` }))
        .map(({ tag, key }) => (
          <div key={key} className="chip">
            {tag}
          </div>
        ))}
    </>
  );
};

export default Article;
