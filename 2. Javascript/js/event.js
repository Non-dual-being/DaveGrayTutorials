const view = document.querySelector('#view2');
const div = view.querySelector('div');
const h2 = div.querySelector('h2');
const view1 = document.querySelector('#view1');


view1.style.display = 'none';
view.style.display = 'flex';

const doSomething = () => {
    alert('Something has to be done');
};

h2.addEventListener('click', doSomething, false); //false is default
h2.removeEventListener('click', doSomething, false);

/* h2.addEventListener('click', (event) => {
    console.log(event.target);
    event.target.textContent = 'Clicked'
}); */

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete'){
        console.log('ready');
        initApp();

    }
});

const initApp = () => {
    const view = document.querySelector('#view2');
    const div = view.querySelector('div');
    const h2 = div.querySelector('h2');


    if (false) {

        /**event bubbling goes in the dom fron the outer to the inner with true*/
        view.addEventListener('click', (event) => {
            event.stopPropagation(); /**since this triggered first only this will change */
            view.style.backgroundColor = 'purple';
        }, true);

        div.addEventListener('click', (event) => {
            div.style.backgroundColor = 'blue';
        }, true);

        h2.addEventListener('click', (event) => {
            event.target.textContent = 'clicked';

        }, true);

    }

    if (false) {
        /**event bubbling on*/
        view.addEventListener('click', (event) => {
            view.style.backgroundColor = 'purple';
        });

        div.addEventListener('click', (event) => {
            div.style.backgroundColor = 'blue';

        });

        h2.addEventListener('click', (event) => {
            event.target.textContent = 'clicked';
            stopPropagation(); /**this wil only trigger this, since with false it goes from inner to outer */

        });
    };

    view.addEventListener('click', (event) => {
        view.classList.toggle('darkblue');
        view.classList.toggle('purple');
    },false);

    div.addEventListener('click', (event) => {
        event.stopPropagation();

        div.classList.remove('black');

        div.classList.add('someRandomStyles')
    },
    false);

    h2.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const textContent = event.target.textContent;
        console.log("textcontent is", textContent);
        textContent === 'My 2nd View' ? event.target.textContent = 'clicked' : event.target.textContent = 'My 2nd View';

    }, false);

    const nav = document.querySelector('nav');
    nav.addEventListener('mouseover', (event) => {
        event.target.classList.add('height100');
        
    });

    /**event bubble, its goes up the DOM, so cuz h2 is in div and div in view every event triggers, with a parameter you cant prevent this  */

};