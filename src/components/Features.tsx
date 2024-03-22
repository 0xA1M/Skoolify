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
      title: "Individual Tutoring",
      desc: "Elevate learning with personalized one-on-one tutoring. Our expert tutors provide targeted support in math, science, language arts, and more, tailored to each student's goals for accelerated progress.",
      iPath: {
        img: "/6.png",
        alt: "Individual Tutoring",
      },
    },
    {
      title: "Collaborative Sessions",
      desc: "Experience focused small group sessions led by experienced educators. Our collaborative learning environments offer peer support and shared learning experiences, maximizing student engagement and achievement.",
      iPath: {
        img: "/3.png",
        alt: "Collaborative Sessions",
      },
    },
    {
      title: "Teacher Dashboard",
      desc: "Streamline access to student info: attendance, grades, and progress. Facilitate parent-teacher communication with our messaging system. Stay organized with an event calendar for exams and school events.",
      iPath: {
        img: "/7.png",
        alt: "Teacher Dashboard",
      },
    },
    {
      title: "Specialized Support Programs",
      desc: "Elevating academic success through tailored assistance that caters to the unique needs of every student. From individualized tutoring sessions to targeted interventions, our comprehensive programs provide personalized support, fostering confidence and achievement in every learner.",
      iPath: {
        img: "/1.png",
        alt: "Specialized Support Programs",
      },
    },
    {
      title: "Flexible Learning",
      desc: "Enjoy flexible scheduling tailored to students' busy lives. Our online tutoring and virtual learning platforms accommodate extracurricular activities, part-time jobs, and other commitments, ensuring seamless access to quality education from anywhere.",
      iPath: {
        img: "/9.png",
        alt: "Flexible Learning",
      },
    },
    {
      title: "Progress Monitoring and Feedback",
      desc: "Track academic growth with regular assessments and progress monitoring. Receive constructive feedback from our teachers and tutors to set goals and ensure continuous improvement for every student.",
      iPath: {
        img: "/8.png",
        alt: "Progress Monitoring and Feedback",
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
