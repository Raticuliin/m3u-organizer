import CurrentFeatures from './CurrentFeatures';
import RoadmapFeatures from './RoadmapFeatures';

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
      <CurrentFeatures />
      <RoadmapFeatures />
    </section>
  );
}
