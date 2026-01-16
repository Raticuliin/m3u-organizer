import Sidebar from '../components/dashboard/Sidebar';
import SourceBrowser from '../components/dashboard/SourceBrowser';
import StagingArea from '../components/dashboard/StagingArea';

export default function Dashboard() {
  return (
    <div
      className="
        h-screen w-full overflow-hidden
        flex 
      bg-stone-900 text-white"
    >
      <Sidebar />
      <main className="flex flex-1 overflow-hidden">
        <SourceBrowser />
        <StagingArea />
      </main>
    </div>
  );
}
