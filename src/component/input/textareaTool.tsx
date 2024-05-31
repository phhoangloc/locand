'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import store from '@/redux/store'
import AddLinkIcon from '@mui/icons-material/AddLink';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { color } from '@/style/theme';

type Props = {
    onChange: (e: string) => void,
    value: string,
}

const TextAreaTool = ({ onChange, value }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const inputRef = useRef<any>()
    const inputImgRef = useRef<any>()
    const inputLinkRef = useRef<any>()

    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [textSelect, setTextSelect] = useState<string>("")

    const [focus, setFocus] = useState<boolean>(false)
    const [focusInputImg, setFocusInputImg] = useState<boolean>(false)
    const [focusInputLink, setFocusInputLink] = useState<boolean>(false)
    const [imglink, setImgLink] = useState<string>("")
    const [link, setLink] = useState<string>("")


    const createText = (value: string) => {

        const child = inputRef.current.childNodes[x]
        if (inputRef?.current.innerText.trim() === "") {
            inputRef.current.innerHTML += `<div><${value}>${value}</${value}></div>`
        } else {
            if (textSelect) {
                child.innerHTML = `<${value}>${textSelect}</${value}>`
            } else {
                if (child.innerText.trim() === "") {
                    child.innerHTML = `<${value}>${value}</${value}>`
                }
            }


        }

        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setTextSelect("")
    }
    const createLink = (value: string) => {
        const child = inputRef.current.childNodes[x]
        if (inputRef?.current.innerText.trim() === "") {
            inputRef.current.innerHTML += `<div><a href=${value} target="_blank">${value}</a></div>`
        } else {
            if (textSelect) {
                child.innerHTML = `<a href=${value} target="_blank">${textSelect}</a>`
            } else {
                if (child.innerText.trim() === "") {
                    child.innerHTML = `<div><a href=${value} target="_blank">${value}</a></div>`
                }
            }
            setFocusInputLink(false)
            setLink("")

        }

    }
    const createImage = (type: string, value: string) => {
        const child = inputRef.current.childNodes[x]
        child ? child.innerHTML += `<${type} style="width:100%" src=${value}></${type}>` : inputRef.current.innerHTML += `<div><${type} style="width:100%" src=${value}></${type}></div>`
        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setFocusInputImg(false)
        setImgLink("")
    }

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = `${value}` : null
    }, [value])


    const getPosition = () => {
        const selection = window.getSelection();
        selection && setTextSelect(selection?.toString())
        const range = selection?.getRangeAt(0);
        const preCaretRange = range?.cloneRange();
        setY(preCaretRange?.endOffset || 0)
        let node: Node | undefined | null = range?.endContainer;
        let index = 0;
        while (node && node !== inputRef.current) {
            if (node.parentNode === inputRef.current) {
                index = Array.prototype.indexOf.call(inputRef.current.childNodes, node);
                break;
            }
            node = node.parentNode;
        }
        setX(index);
    }

    const box: React.CSSProperties = {
        padding: "5px",
        margin: "10px 0",
        transition: "all 0.25s",
    }
    const boxFocus: React.CSSProperties = {
        padding: "5px",
        background: currentTheme ? color.background_light : color.background_dark,
        color: currentTheme ? color.main : color.background_light,
    }
    const tool: React.CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
    }

    const button: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        boxShadow: "2px 2px 4px -2px #888",
        transition: "all 0.25s",
        marginRight: "5px"
    }

    const icon: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: "5px",
        marginRight: "5px",
        boxShadow: "2px 2px 4px -2px #888",
        transition: "all 0.25s",
    }

    const buttonFocus: React.CSSProperties = {
        background: color.main,
        color: color.background_light
    }

    const input: React.CSSProperties = {
        width: "0px",
        height: "40px",
        boxSizing: "border-box",
        margin: "0px",
        padding: 0,
        color: currentTheme ? color.dark : color.light,
        background: currentTheme ? color.light : color.dark,
        border: "none",
        transition: "all 0.5s",
        borderRadius: "5px",
    }
    const inputFocus: React.CSSProperties = {
        width: "150px"
    }

    const inputBox: React.CSSProperties = {
        minHeight: "300px",
        padding: "10px 5px"
    }

    return (
        <div style={focus || inputRef?.current?.innerHTML ? { ...box, ...boxFocus } : { ...box }}>
            <div style={{ ...tool }}>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h1")}>h1</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h2")}>h2</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h3")}>h3</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h4")}>h4</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("p")}>p</p>
                <div style={{ display: "flex" }}>
                    <input ref={inputLinkRef}
                        style={focusInputLink ? { ...input, ...inputFocus } : { ...input }}
                        placeholder='url link' onChange={(e) => setLink(e.target.value)}
                        onFocus={(e) => { setFocusInputLink(true), e.target.style.outline = 'none' }}></input>
                    {focusInputLink ?
                        <CheckIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { createLink(link), setFocusInputLink(false), setLink("") }} /> : null}
                    {focusInputLink ?
                        <CloseIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { setLink(""), setFocusInputLink(false) }} /> :
                        <AddLinkIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { inputLinkRef.current?.focus() }} />}
                </div>
                <div style={{ display: "flex" }}>
                    <input ref={inputImgRef}
                        style={focusInputImg ? { ...input, ...inputFocus } : { ...input }}
                        placeholder='img link' onChange={(e) => setImgLink(e.target.value)}
                        onFocus={(e) => { setFocusInputImg(true), e.target.style.outline = 'none' }}></input>
                    {focusInputImg ?
                        <CheckIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { createImage("img", imglink), setFocusInputImg(false), setImgLink("") }} /> : null}
                    {focusInputImg ?
                        <CloseIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { setImgLink(""), setFocusInputImg(false) }} /> :
                        <AddPhotoAlternateIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { inputImgRef.current?.focus() }} />}
                </div>
            </div>
            <div ref={inputRef}
                style={{ ...inputBox }}
                contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={(e) => { setFocus(true), e.target.style.outline = 'none'; }}
                onBlur={() => setFocus(false)}
                onSelect={() => getPosition()}
                onMouseUp={() => getPosition()}
                onKeyUp={() => getPosition()}
            >
            </div>
        </div >
    )
}

export default TextAreaTool