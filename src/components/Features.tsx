/* Custom Component */
import Article from "./Article";

/* Types */
type Feature = {
  title: string;
  desc: string;
  iPath: {
    img: string;
    alt: string;
  };
}[];

function Features() {
  const features: Feature = [
    {
      title: "User-friendly Interface",
      desc: "Experience seamless navigation and accessibility through an intuitively designed interface. Our user-centric approach ensures that users can effortlessly find what they need, enhancing their overall experience.",
      iPath: {
        img: "/6.png",
        alt: "User-friendly Interface",
      },
    },
    {
      title: "Student Management",
      desc: "Seamlessly oversee student profiles, track attendance, and maintain comprehensive academic records. With streamlined processes, educators can focus more on personalized learning and student development.",
      iPath: {
        img: "/3.png",
        alt: "Student Management",
      },
    },
    {
      title: "Teacher Dashboard",
      desc: "Empower educators with a robust set of tools tailored for effective lesson planning, efficient grading, and seamless communication with students and parents. The dashboard serves as a centralized hub for optimizing teaching strategies and fostering collaboration.",
      iPath: {
        img: "/7.png",
        alt: "Teacher Dashboard",
      },
    },
    {
      title: "Administrative Tools",
      desc: "Revolutionize administrative tasks with tools designed to simplify scheduling, streamline resource allocation, and generate insightful reports. By automating routine processes, administrators can allocate more time and resources to strategic initiatives.",
      iPath: {
        img: "/1.png",
        alt: "Administrative Tools",
      },
    },
  ];

  return (
    <section className="w-full" id="features">
      {features.map((feature, i) => (
        <Article
          key={i}
          title={feature.title}
          desc={feature.desc}
          iPath={feature.iPath}
          flip={(i + 1) % 2 == 0}
        />
      ))}
    </section>
  );
}

export default Features;
