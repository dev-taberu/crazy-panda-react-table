import './style/table.css';

import Table from './components/table/Table';

const tableHeaders = {
  name: 'Имя',
  surname: 'Фамилия',
  age: 'Возраст',
  birthDate: 'Дата рождения',
  city: 'Город'
}

const dataGeneration = () => {
  let data = [];
  for(let i = 0; i < 30; i++) {
    data.push({name: `Ivan${i}`, surname: 'Ivanov', age: Math.trunc(i / 2) + 31, birthDate: 1990, city: 'Moscow'})
  }
  for(let i = 0; i < 30; i++) {
    data.push({name: `Denis${i}`, surname: 'Denisov', age: Math.trunc(i / 2) + 15, birthDate: 2005, city: 'Kazan'})
  }
  for(let i = 0; i < 30; i++) {
    data.push({name: `Maria${i}`, surname: 'Solnceva', age: Math.trunc(i / 2) + 23, birthDate: 1998, city: 'Voronezh'})
  }
  data.push({name: `Ivna`, surname: 'test', age: 21, birthDate: 1009, city:'Moscorw'})
  return data;
}

function App() {
  return (
    <div className="App">
      <Table headers={tableHeaders} data={dataGeneration()} itemsOnPage={['10', '20', '30', '50']}/>
    </div>
  );
}

export default App;
