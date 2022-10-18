# Projeto OLX front-end

Para fins de estudos foi desenvolvido esse projeto onde o intuito é simular o front-end da OLX, foi construído com React + TypeScript e baseado totalmente em uma API onde salvamos as informações no banco de dados MongoDB.<br/>
Nesse projeto você pode estar criando uma conta, fazendo login e pode tá adicionando seus anúncios fictícios, você também tem como alterar e excluir seus anúncios. Existem outras opções como criar e deletar os estados existentes e os tipos de categorias, mas essas opções estão disponiveis apenas para usuários que possuem permissão de administrador.<br/>
Você pode também fazer buscas de anúncios filtrando por categorias, estados ou pode simlesmente pesquisar um anúncio que vier em mente.
Nesse projeto foi feito o uso das bibliotecas:
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-slideshow-image](https://www.npmjs.com/package/react-slideshow-image)
- [qs](https://www.npmjs.com/package/qs)
- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [react-number-format](https://www.npmjs.com/package/react-number-format)

## Sobre a API usada
A API onde possui o padrão REST também construída por mim foi hospedada gratuitamente(por 500 horas mensais) na Railway, por conta disso durante cada mês ela fica no ar por 20 dias e para de funcionar, mas todo dia 01 ela volta a funcionar normalmente. Para mais informação sobre a API e seus endpoints:
- [API OLX em Node v2.0](https://github.com/ladsonmario/nodets-api-olx)<br/><br/>
Para consumir você pode usar o endereço base:
- `https://nodets-api-olx-production.up.railway.app`


## Estilização
Para estilização foi usada a biblioteca [Styled-Components](https://styled-components.com/).

## Projeto gerado em CRA

### Instalação
- `npm install`

### Para rodar
- `npm start`

## Para testar
O projeto foi hospedado na Vercel. Para testes: [Clique aqui](https://react-laday-store.vercel.app/).