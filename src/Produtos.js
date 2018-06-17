import React, { Component } from 'react'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

import { Route, Link } from 'react-router-dom'

class Produtos extends Component {
    render() {
        const { match } = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <Link to='/produtos/categoria/1'>Categoria 1</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url+'/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}

export default Produtos