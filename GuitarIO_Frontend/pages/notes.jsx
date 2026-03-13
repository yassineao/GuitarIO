import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Note from '../components/note';
import Card from '../components/card';
export default function Notes() {
  const handleClick = () => {
    const link = getLink();
    if (link !== '#') {
      // Redirect with refresh
      window.location.href = link;
    }
  };

  const getLink = () => {
    switch (selectedValue) {
      case 'valueIs-1':
        return '/majorNotes';
      case 'valueIs-2':
        return '/search-music-tabs';
      case 'valueIs-3':
        return '/play-song';
      case 'valueIs-4':
        return '/notes/a';
      default:
        return '#'; // Default link if no option is selected
    }
  };

  return (
    <div >
      <section className="cardo">

      <Card name={"all the variation of the note A"} handle={"/notes/a"}></Card>
      <Card name={"all the variation of the note B"} handle={"/notes/b"}></Card>
      <Card name={"all the variation of the note C"} handle={"/notes/c"}></Card>
      <Card name={"all the variation of the note D"} handle={"/notes/d"}></Card>
      <Card name={"all the variation of the note E"} handle={"/notes/e"}></Card>
      <Card name={"all the variation of the note F"}handle={"/notes/f"}></Card>
      <Card name={"all the variation of the note G"} handle={"/notes/g"}></Card>

      </section>
  
    </div>
  );
}
