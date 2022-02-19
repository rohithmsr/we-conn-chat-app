import { useEffect } from 'react';
import { fb } from './service/firebase';

const App = () => {
  useEffect(() => {
    fb.firestore
      .collection('chatUsers')
      .where('userName', '==', 'test1234')
      .get()
      .then(res => {
        const users = res.docs[0]?.data();
        console.log(users);
      });
  }, []);

  return <>Hello from Rohith M S R 👨‍💻👨‍💻</>;
};

export default App;
