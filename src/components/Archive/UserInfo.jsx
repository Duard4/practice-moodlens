import userData from '/src/data/topReviewers.json';

const UserInfo = ({ userId }) => {
  const user = userData.find((user) => user.id === userId);

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md grid grid-cols-5  justify-end items-center">
      <h1 className="text-2xl font-bold mb-2 col-span-3">{user.name}</h1>
      <div className="col-span-2 sm:row-span-2 ml-auto sm:mr-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
      </div>
      <p className="text-base-content col-span-5 sm:col-span-4">
        {user.description}
      </p>
    </div>
  );
};

export default UserInfo;
