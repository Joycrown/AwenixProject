function LoadingScreen() {
  return (
    <div className="fixed w-full h-screen left-0 top-0">
      <div className="absolute w-full h-full bg-black bg-opacity-75" />
      <div className="relative">
        <span className="loading loading-infinity loading-xs"></span>
        <span className="loading loading-infinity loading-sm"></span>
        <span className="loading loading-infinity loading-md"></span>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    </div>
  );
}

export default LoadingScreen;
