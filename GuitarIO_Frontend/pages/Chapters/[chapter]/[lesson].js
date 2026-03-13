import useSWR, { mutate } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import WavyGuitarStrings from "../../../components/loader";
import ProtectedRoute from "../../../components/protectedContent";
const fetcher = async (url) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export default function Chapters({ chapter, lesson }) {
  console.log("chapter:", chapter, "lesson:", lesson);
  const router = useRouter();

  // lesson is already the number from the URL
  const num = parseInt(lesson, 10);

  // chapter is the chapter name
  const title = decodeURIComponent(chapter);

  // API key
  const key = `/api/lessons/${encodeURIComponent(title)}/${num}`;

  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  });

const { data: chaptersIndex } = useSWR(
  "/api/lessons/chapters-with-numbers",
  fetcher,
  { revalidateOnFocus: false, dedupingInterval: 10 * 60 * 1000 }
);  
console.log("chaptersIndex:", chaptersIndex);

  if (isLoading) return <WavyGuitarStrings />;
  if (error) return <p>Error: {error.message}</p>;

  const lessonC = (data?.content || "").replace(/\\n/g, "\n");

  // NEXT lesson




  const nextNum = num + 1;
  const nextHref = `/Chapters/${encodeURIComponent(title)}/${nextNum}`;
  const nextKey = `/api/lessons/${encodeURIComponent(title)}/${nextNum}`;

const lessonNumbers = chaptersIndex?.[title] || [];
const hasNext = lessonNumbers.includes(nextNum);
console.log("hasNext:", hasNext, "nextNum:", nextNum, "lessonNumbers:", lessonNumbers);
 const prefetchNext = () => {
  if (!hasNext) return;
  mutate(nextKey, fetcher(nextKey), false);
};


  return (
    <ProtectedRoute>  
     <div className="lessonss">

        <div className="titel1" style={{ width: "0" }}>
          <h2>{ chapter } Lesson</h2>
      </div>
      <div id="celeste">

      


        <div className="top-left" />
        <div className="bottom-right" />

        <div className="celeste2">
          <div className="celeste3">
            <div className="celeste4">
              <div className="celeste-write">
               {lessonC ? (
          lessonC.split(/\r?\n/).map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))
        ) : (
          <p>No lesson content available.</p>
        )}
              </div>

              <div className="celeste5">
                <div className="celeste-iconn">
                  <div
                    className="celeste-iconnn"
                    style={{
                      backgroundImage: "url(https://r4.wallpaperflare.com/wallpaper/981/624/44/bocchi-the-rock-hitori-bocchi-guitar-forest-vertical-hd-wallpaper-e30a33aae8658cad98a29e7371f82261.jpg)",
                    }}
                  >
                    <div className="celeste-iconnnn" />
                    <div className="celeste-ball1" />
                  </div>
                </div>

                <div className="celeste-lyrics">
                  <sup>Already finished </sup>
                  <h1>Go to the next lesson</h1>
                  <sub>
                     {hasNext ? (
  <Link href={nextHref} onMouseEnter={prefetchNext}>
    Next lesson →
  </Link>
) : (
    <Link href="/Chapters" >
   <span style={{ opacity: 0.6 }}>Last lesson ✔ Next Chapter</span>
  </Link>
  
)}

                  
                  </sub>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </ProtectedRoute>

  );
}

export async function getServerSideProps(context) {
  const { chapter, lesson } = context.params;

  return {
    props: {
      chapter,
      lesson,
    },
  };
}
