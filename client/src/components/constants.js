import React from 'react';
import { GoHome } from 'react-icons/go';
import { BsBook } from 'react-icons/bs';
import { IoIosPerson } from 'react-icons/io';
let headerOptions = [
  {
    name: 'Home',
    link: '/',
    icon: <GoHome />
  },
  {
    name: 'My Books',
    link: '/books',
    icon: <BsBook />
  },
  {
    name: 'My Authors',
    link: '/authors',
    icon: <IoIosPerson />
  }
];

export default headerOptions;
