import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// components
import Wrapper from 'components/sideMenu/Wrapper'
import BookInfo from 'components/nav/BookInfo'
// types
import { RootState } from 'slices'
import Book from 'types/book'
import Speech1 from 'containers/speech'

const Spe = ({ onSend, onToggle, state, title }: Props, ref: any) => {

  const [yyy, sety] = useState<string>("");
  const book = useSelector<RootState, Book>(state => state.book.book);

  /** Click nav item */




  //   const Tocs = bookToc.map((t, idx) => 
  //     <NavItem key={idx}
  //              message={t.label}
  //              onClick={() => onClickItem(t.href)} />
  //   );

  useEffect(() => {

    let x = onSend?.current?.children[0]?.children
    // let xx =x?.map((item : any)=> item)
    console.log("32323", x)

    let v: any;
    let string1: any
    for (v = 0; v < x?.length; v++) {
      console.log("--------------------------", v);

      string1 = onSend?.current?.children[0]?.children[v]?.children[0]?.srcdoc;
    }




    console.log("string1", string1);

    var span = document.createElement('span')

    span.innerHTML = string1;


    var data: any
    data = span.textContent
    console.log(data)

    sety(data)
    // console.log(x?.text)

    // var y = document.getElementById(`${x}`)

    // console.log(y)

    // var z = document.querySelector("#epubjs-view-132c0d1d-d73d-4ae9-df70-a07214f5cc5a")

    // console.log(z)

    // var a = z?.src ;

    // console.log(a)

    //     let str = onSend.current.innerHTML
    //     // var str = "<b>Bob</b>, I'm <b>20</b> years old, I like <b>programming</b>.";
    // var result = str.match(/<p(.*?)<\/p>/g)?.map(function(val:any){
    //    return val.replace(/<\/?p?>/g,'');
    // });
    //     console.log(result)




    // let x = str.substr(str.indexOf('<p>')+1).trim("</p>")
    // console.log(x)
    // var split = x.split("</p>");
    // console.log(split)
    // let z = [ split.slice(0, -1).join("</p>") ].concat(split.slice(-1))[0]
    // let y = z.replace(/<p>/g,'').replace(/<\/p>/g,'')
    // console.log(y)
    // sety(y)



  }, [state])

  // useEffect(() => {
  //   console.log("--------------**************--------------");

  //   sety("")
  // }, [title])


  console.log(yyy)
  return (<>
    <Wrapper title="Speech"
      show={state}
      onClose={() => onToggle()}
      ref={ref}>

      {/* <Speech1 data={yyy}/> */}
      <BookInfo
        src={book.coverURL}
        title={book.title}
        publisher={book.publisher}
        author={book.author}
      />

      <div style={{ textAlign: "center" }}>
        {title}
        {yyy ? <Speech1 data={yyy} /> : null}
      </div>

      {/* {Tocs} */}
    </Wrapper>
  </>);
}

interface Props {
  title: any
  onSend: any;
  state: boolean;
  onToggle: () => void;
}

export default React.forwardRef(Spe)