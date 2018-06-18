import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

class ProdutosNovo extends Component{
    constructor(props){
        super(props)

        this.handleNewProduto = this.handleNewProduto.bind(this)

        this.state = {
            redirect: false
        }
    }
    handleNewProduto(){
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
            .then((res) => this.setState({
                    redirect: '/produtos/categorias/'+produto.categoria
                })
            )
    }
    render(){
        const { categorias } = this.props
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (<div>
                <h2>Novo produto</h2>
                <select ref='categoria'>
                    {categorias
                        .map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)
                    }
                </select>
                <input 
                    className='form-control'
                    placeholder='Nome do novo produto'
                    ref='produto' 
                />
                <button onClick={this.handleNewProduto}>Salvar</button>
            </div>)
    }
}

export default ProdutosNovo