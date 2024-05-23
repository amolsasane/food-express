const Contact = () => {
  return (
    <div className="text-center pt-4">
      <h1 className="font-bold">Contact Us</h1>
      <form>
        <input
          className="p-4 m-4 border border-gray-500"
          placeholder="Name"
        ></input>
        <input
          className="p-2 m-2 border border-gray-500"
          placeholder="Message"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
