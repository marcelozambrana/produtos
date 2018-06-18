import React, { Component } from 'react'

import ProdutosHome from './ProdutosHome'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'
import Categoria from './Categoria'

import { Route, Link } from 'react-router-dom'

class Produtos extends Component {
    constructor(props){
        super(props)

        this.state = {
            editingCategoria: ''
        }
       
        this.renderCategoria = this.renderCategoria.bind(this)
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelCategoria = this.cancelCategoria.bind(this)
    }
    componentDidMount(){
        this.props.loadCategorias()
    }
    handleNewCategoria(key){
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
       }
    }
    handleEditCategoria(key){
        console.log(this.refs['cat-'+this.state.editingCategoria])
        if (key.keyCode === 13) {
            this.props.editCategoria({
                id: this.state.editingCategoria,
                categoria: this.refs['cat-'+this.state.editingCategoria].value
            })
            this.setState({
                editingCategoria: ''
            })
       }
    }
    editCategoria(categoria){
        this.setState({
            editingCategoria: categoria.id
        })
    }
    cancelCategoria(categoria){
        console.log(categoria)
        this.setState({
            editingCategoria: ''
        })
    }
    renderCategoria(cat){
        return(
            <li key={cat.id}>
            { this.state.editingCategoria === cat.id && 
                <div className='input-group'>
                    <div className='input-group-btn'>
                        <input 
                            type='text' 
                            className='form-control' 
                            defaultValue={cat.categoria} 
                            onKeyUp={this.handleEditCategoria}  
                            ref={'cat-'+cat.id} />
                        <button className='btn' onClick={() => this.cancelCategoria()}>Cancel</button>
                    </div>
                </div>
            }
            { this.state.editingCategoria !== cat.id && 
                <div>
                    <button className='btn btn-sm' onClick={() => this.props.removeCategoria(cat)}>
                        <span className='glyphicon glyphicon-remove'></span>
                    </button>
                    <button className='btn btn-sm' onClick={() => this.editCategoria(cat)}>
                        <span className='glyphicon glyphicon-pencil'></span>
                    </button>
                    <Link to={`/produtos/categorias/${cat.id}`}>{cat.categoria}</Link>
                </div>
            }
            </li>
        )
    }
    render() {
        const { match, categorias } = this.props
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h3>Categorias</h3>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            {categorias.map(this.renderCategoria)}
                        </ul>
                        <div className='card card-body bg-light'>
                            <input 
                                onKeyUp={this.handleNewCategoria} 
                                type='text'
                                className='form-control'
                                ref='categoria' 
                                placeholder='Nova categoria' 
                            />
                        </div>
                        <Link to='/produtos/novo'>Novo produto</Link>
                    </div>
                    <div className='col-md-9'>
                        <h1>Produtos</h1>
                        <Route exact path={match.url} component={ProdutosHome} />
                        <Route exact path={match.url+'/novo'} 
                            render={(props) => {
                                return <ProdutosNovo {...props} 
                                    categorias={categorias}
                                    createProduto={this.props.createProduto} 
                                />
                            }} />
                        <Route exact path={match.url+'/editar/:id'} 
                            render={(props) => {
                                return <ProdutosEditar {...props}
                                    categorias={categorias}
                                    readProduto={this.props.readProduto}
                                    editProduto={this.props.editProduto}
                                /> 
                            }}
                        />
                        <Route exact path={match.url+'/categorias/:catId'} 
                            render={(props) => {
                             return <Categoria {...props}
                                loadProdutos={this.props.loadProdutos}
                                loadCategoria={this.props.loadCategoria}
                                produtos={this.props.produtos}
                                removeProduto={this.props.removeProduto}  />
                            }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Produtos