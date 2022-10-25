const comments = [];
document.addEventListener( 'DOMContentLoaded', function() {
    const mainContent = document.querySelector('#main-content');
    const mainCommentBox = document.querySelector('#input-main');
    const mainSubmitButton = document.querySelector('#button-main');
    let comments = [
        // {
        //     post: 'This is a dynamic comment',
        //     author: 'Wasim',
        //     likes: 11,
        //     replies: []
        // }
    ]
    // refreshComments();

    mainSubmitButton.addEventListener( 'click', ( event ) => {
        const inputVal = mainCommentBox.value;
        if( inputVal.trim() ) {

            comments.push( {
                post: inputVal,
                likes: 0,
                author: 'Wasim',
                replies: []
            } )
            refreshComments( mainContent, comments,  true );
            mainCommentBox.value = ''
        }
    } )


    // create Element
    function createElement( tagName, text, parent, attribute, className ) {
        const node = document.createElement( tagName );
        if( text !== null ) {
            const textNode = document.createTextNode( text );
            node.appendChild( textNode );
        }
        if( attribute != null ) {
            node.setAttribute( attribute[ 0 ], attribute[ 1 ] );
        }
        if( className !== null ) {
            node.classList.add( className );
        }

        parent.appendChild( node );
        return node;
    }

    function refreshComments( mainContentCopy, commentsCopy, isComment = false ) {
        // clear main content except form
        if( isComment ) {
            mainContentCopy.innerHTML = '';
        }else {
            let count = mainContentCopy.children.length;
            while (mainContentCopy.firstChild && count > 3  ) {
                if( mainContent.lastElementChild?.id === 'box' ) {
                    mainContentCopy.removeChild(mainContentCopy.lastChild);
                }
                count--;
            }
        }

        commentsCopy.map( ( comment, index ) => {
            // main box
            const box = createElement( 'div', null, mainContentCopy, [ 'id', 'box' ], 'box' );

            // box para
            const para = createElement( 'p', comment?.post, box, null, 'box-para' );

            // box info
            const boxInfo = createElement( 'div', null, box, null, 'box-info' );

            // Author Info
            const authorInfo = createElement( 'div', null, boxInfo, null, 'author-info' );
            const spanTitle = createElement( 'span', 'Author: ', authorInfo, null, null );
            const spanAuthor = createElement( 'span', `${ comment?.author }`, authorInfo, null, null );

            // Likes
            const likes = createElement( 'div', null, boxInfo, null, 'likes' );
            const likesTitle = createElement( 'span', 'Likes: : ', likes, null, null );
            const likesCount = createElement( 'span', `${ comment.likes }`, likes, null, null );

            // box actions
            const boxActions = createElement( 'div', null, box, null, 'box-actions' );
            const likeButton = createElement( 'button', 'Like', boxActions, [ 'id', 'like-button' ], 'like-button' );
            likeButton.addEventListener( 'click', function( event ) {
                comment.likes += 1;
            } );
            const replyButton = createElement( 'button', 'Reply', boxActions, [ 'id', 'reply-button' ], 'reply-button' );
            replyButton.addEventListener( 'click', function( event ) {
                const children = box.children;
                const hasChild = box.querySelector( `#box__${index}__${comment?.replies.length}__form` ) === null;
                if( hasChild ) {
                    const id = `box__${index}__${ comment?.replies?.length || 0 }`;
                    // const form = createElement( 'div', null, box, [ 'id', `${id}__form` ], 'form' );
                    const form = document.createElement( 'div' );
                    form.classList.add( 'form' );
                    box.insertBefore( form, box.children[ 3 ] );
                    const inputBox = createElement( 'input', null, form, [ 'type', 'text' ], 'input' );
                    inputBox.setAttribute( 'id', `${ id }__input` )
                    const submitButton = createElement( 'button', 'Submit', form, null, 'button' );
    
                    submitButton.addEventListener( 'click', function( event ) {
                        const inputBoxClosure = document.querySelector( `#${ id }__input` );
                        const inputBoxClosureVal = inputBoxClosure.value;
    
                        if( inputBoxClosureVal.trim() ) {
                            comment?.replies.push( {
                                post: inputBoxClosureVal,
                                likes: 0,
                                author: 'Wasim',
                                replies: []
                            } )
                            // refreshComments( box, comment?.replies  );
                            inputBoxClosureVal.value = '';
                            if( comment?.replies.length ) {
                                refreshComments( box, comment?.replies )
                            }
                            box.removeChild( form )
                        }
                    } )
                }
            } )
        } )
    }
} );