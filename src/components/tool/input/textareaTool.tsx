'use client'
import React, { useState, useEffect } from 'react'
// import ImageModal from '@/component/modal/imageModal';
import { Editor, EditorState, RichUtils, Modifier, AtomicBlockUtils, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BurstModeIcon from '@mui/icons-material/BurstMode';

import { ApiItem } from '@/api/client';
import Select from './select';

type Props = {
    onChange: (e: string) => void,
    onClick?: () => void,
    value: string,
    sx?: string,
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    h4?: boolean,
    h5?: boolean,
    p?: boolean,
    bold?: boolean,
    italic?: boolean,
    li?: boolean,
    importImage?: number
}

const Image = (props: any) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();
    return <img src={src} alt="" style={{ maxWidth: '100%' }} />;
};
const IDSpan = (props: any) => {
    const { id, children } = props.contentState.getEntity(props.entityKey).getData();
    return <span id={id}>{children}</span>;
};
const decorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE'
                );
            }, callback);
        },
        component: Image,
    },
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null && contentState.getEntity(entityKey).getType() === 'ID'
                );
            }, callback);
        },
        component: IDSpan,
    },
]);

const TextAreaTool = (props: Props) => {



    //content
    const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));
    const [content, setContent] = useState<string>("");
    // const [content, setContent] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");
    const contentState = editorState.getCurrentContent();

    //selection
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const block = editorState.getCurrentContent().getBlockForKey(startKey);
    const newEditorState = EditorState.acceptSelection(editorState, selectionState)
    const blockType = block.getType();
    const title = blockType === "header-one" && "h1" || blockType === "header-two" && "h2" || blockType === "header-three" && "h3" || blockType === "header-four" && "h4" || blockType === "header-five" && "h5" || "p"
    const startOffset = selectionState.getStartOffset();
    const [entityKey, setEntityKey] = useState<any>("")
    const [entity, setEntity] = useState<any>("")

    useEffect(() => {
        block.getEntityAt(startOffset) ? setEntityKey(block.getEntityAt(startOffset)) : setEntityKey("")
    }, [block, startOffset])

    useEffect(() => {
        entityKey ? setEntity(contentState.getEntity(entityKey)) : setEntity("")
    }, [entityKey])

    //link
    const [link, setLink] = useState<string>("")
    const [linkImg, setLinkImg] = useState<string>("")
    const [isInputLink, setIsInputLink] = useState<boolean>(false)
    const [isInputLinkImg, setIsInputLinkImg] = useState<boolean>(false)
    const [imgArr, setImgArr] = useState<any[]>([])


    const createBlockStyle = (value: any, type: string) => {
        setEditorState(RichUtils.toggleBlockType(value, type));
    }
    const createInlineStyle = (value: any, type: string) => {
        setEditorState(RichUtils.toggleInlineStyle(value, type));
    }
    const createLink = (value: string) => {
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: value });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newContentState = Modifier.applyEntity(
            contentStateWithEntity,
            editorState.getSelection(),
            entityKey
        );
        let newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        newEditorState = newEditorState.getCurrentInlineStyle().has("UNDERLINE") ? RichUtils.toggleInlineStyle(newEditorState, '') : RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE');
        setEditorState(newEditorState);

    }
    const removeLink = () => {
        if (!selectionState.isCollapsed()) {
            const contentStateWithEntity = contentState.createEntity('', 'MUTABLE',);
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newContentState = Modifier.applyEntity(
                contentStateWithEntity,
                editorState.getSelection(),
                entityKey
            );
            let newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
            newEditorState = newEditorState.getCurrentInlineStyle().has("UNDERLINE") ? RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE') : RichUtils.toggleInlineStyle(newEditorState, '');
            setEditorState(newEditorState);
        }
    };
    const createImage = async (value: string) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'MUTABLE', { src: value });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(newEditorState);

    }
    const addId = (id: string) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('ID', 'MUTABLE', { id });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newContentState = Modifier.applyEntity(
            contentStateWithEntity,
            editorState.getSelection(),
            entityKey
        );
        let newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        setEditorState(newEditorState);
    }


    useEffect(() => {
        const valueState = stateFromHTML(props.value)
        setEditorState(EditorState.createWithContent(valueState, decorator))
    }, [props.value])

    useEffect(() => {
        setContent(stateToHTML(editorState.getCurrentContent()))
    }, [editorState])

    useEffect(() => {
        props.onChange && props.onChange(content)
    }, [content])

    const onCheck = (link: string) => {
        isInputLink && createLink(link)
        isInputLinkImg && createImage(link)
        setIsInputLink(false)
        setIsInputLinkImg(false)
        setLink("")
        setLinkImg("")
    }

    useEffect(() => {
        imgArr[0]?.src && createImage(imgArr[0].src)
    }, [imgArr])

    const getPicture = async (id: string) => {
        const result = await ApiItem({ archive: "pic", id })
        await createImage(process.env.ftp_url + result.data[0].name)
    }

    useEffect(() => {
        props.importImage && getPicture(props.importImage.toString())
    }, [props.importImage])

    console.log(content)
    return (
        <div className='my-1 border-[1px] border-slate-200 dark:border-slate-700 relative'>
            <div className='sticky p-1 bg-slate-50 dark:bg-slate-900 top-0'>
                <div className='flex h-12 justify-between border-b-[1px] border-slate-200 dark:border-slate-700'>
                    <BurstModeIcon className='!w-10 !h-10 p-1 hover:bg-orange-500 hover:text-white rounded cursor-pointer' onClick={() => { props.onClick && props.onClick() }} />
                </div>

                <div className='relative py-1 border-b-[1px] border-slate-200 dark:border-slate-700'>
                    <div className='flex flex-wrap relative'>
                        <Select title={title} sx='w-24' data={[
                            { title: "h1", func: () => createBlockStyle(editorState, "header-one") },
                            { title: "h2", func: () => createBlockStyle(editorState, "header-two") },
                            { title: "h3", func: () => createBlockStyle(editorState, "header-three") },
                            { title: "h4", func: () => createBlockStyle(editorState, "header-four") },
                            { title: "h5", func: () => createBlockStyle(editorState, "header-five") },
                            { title: "p", func: () => createBlockStyle(editorState, "paragraph") }
                        ]
                        } />
                        <FormatListBulletedIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  ${blockType === "unordered-list-item" ? "bg-orange-500 text-white" : ""}`} onClick={() => createBlockStyle(editorState, "unordered-list-item")} />
                        <FormatBoldIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  ${newEditorState.getCurrentInlineStyle().has("BOLD") ? "bg-orange-500 text-white" : ""}`} onClick={() => createInlineStyle(editorState, "BOLD")} />
                        <FormatItalicIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  ${newEditorState.getCurrentInlineStyle().has("ITALIC") ? "bg-orange-500 text-white" : ""}`} onClick={() => createInlineStyle(editorState, "ITALIC")} />
                        <FormatUnderlinedIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  ${newEditorState.getCurrentInlineStyle().has("UNDERLINE") ? "bg-orange-500 text-white" : ""}`} onClick={() => createInlineStyle(editorState, "UNDERLINE")} />
                        <AddLinkIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  ${entity && entity.getType() === "LINK" ? "bg-main" : ""}`} onClick={() => { setIsInputLink(!isInputLink) }} />
                        <LinkOffIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  `} onClick={() => removeLink()} />
                        <AddPhotoAlternateIcon className={`!w-12 !h-12 p-3 hover:bg-orange-500 hover:text-white rounded cursor-pointer  `} onClick={() => setIsInputLinkImg(true)} />
                        {/* <PlaylistAddIcon className={`svg40px br-5px `} onClick={() => addId("123")} /> */}
                    </div>
                    <div className={`bg-slate-50 dark:bg-slate-900 flex transition-all duration-200 absolute shadow-sm rounded cursor-pointer left-[-4px] p-1 ${isInputLink || isInputLinkImg ? "top-14 z-[1]" : "top-0 z-[-1] opacity-0"}`}>
                        <input
                            className='border-[1px] border-slate-200 dark:border-slate-700 rounded cursor-pointer bg-white dark:bg-inherit'
                            onChange={(e) => { isInputLink && setLink(e.target.value); isInputLinkImg && setLinkImg(e.target.value); }}
                            value={link || linkImg}
                            onFocus={(e) => {
                                e.target.style.outline = 'none'
                            }}>
                        </input>
                        <CloseIcon className={`!w-12 !h-12 p-3  bg-main hover:bg-orange-500 hover:text-white rounded cursor-pointer`} onClick={() => { setIsInputLink(false), setIsInputLinkImg(false) }} />
                        <CheckIcon className={`!w-12 !h-12 p-3  bg-main hover:bg-orange-500 hover:text-white rounded cursor-pointer`} onClick={() => onCheck(link || linkImg)} />
                    </div>
                </div>

            </div>
            <div className={`min-h-80 bg-white dark:bg-inherit p-2 dangerous_box ${props.sx}`}>
                <Editor editorState={editorState} onChange={(editorState) => setEditorState(editorState)} />
            </div>
        </div >
    )
}

export default TextAreaTool