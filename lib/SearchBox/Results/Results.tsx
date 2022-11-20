import React, { useState } from 'react';
import { Search } from '../Svg';

const Results = (): JSX.Element => {
  const [results] = useState(
    [
      {
        id: 1,
        title: 'Javascript language',
        detail: 'Lorem ipsum dolor sit amet.',
        image: 'https://www.sistemkod.com/images/blog/javascriptlogo.png'
      },

      {
        id: 2,
        title: 'Java language'
      },

      {
        id: 3,
        title: 'Kotlin language',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png'
      },

      {
        id: 4,
        title: 'Swift language'
      },

      {
        id: 5,
        title: 'Dart language'
      },

      {
        id: 6,
        title: 'Python language',
        detail: 'Lorem ipsum dolor sit amet.'
      },

      {
        id: 7,
        title: 'Rust Language',
        detail: 'Lorem ipsum dolor sit amet.',
        image: ''
      }
    ]
  );

  return (
    <div className='w-[calc(100%_-_33px)] bg-white custom-box-shadow rounded-xl absolute top-11 -left-[26px] overflow-hidden hidden'>
      <ul className='py-3'>
        {
          results.map(item => (
            <li key={item.id} className=''>
              <div className='flex cursor-default hover:bg-gray-100 h-8 leading-8'>
                <div className='w-12 flex justify-center items-center'>
                  <Search size='mini'/>
                </div>
                <p>{item.title}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Results;
