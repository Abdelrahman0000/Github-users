type Props = {
  name: string;
  followers: number;
};

const Followers = ({ name, followers }: Props) => {
  return (
    <div className="followers">
      <h6>{followers}</h6>
      <p> {name}</p>
    </div>
  );
};
export default Followers;
