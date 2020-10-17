import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/NavBar/Header';

class About extends React.Component<any, any> {
    render() {
        return (
            <>
                <Header page="about" />
                <section>
                    <article>
                        <header>
                            <p>Esto es Home</p>
                        </header>
                        <main></main>
                        <footer></footer>
                    </article>
                </section>
            </>
        );
    }
}
export default About;
