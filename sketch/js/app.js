var data = (typeof MagazineData !== 'undefined') ? (JSON.parse(MagazineData.innerHTML)) : null;
var magazine = {
  init: function(){
    this.dots();
  },
  dots: function(){
    console.log("build dots");
    $(document).on('click', '.dot', function(){
      console.log("click");
      var tag = $(this).find('.dot__txt');
      $('.dot__txt').stop(true,true).fadeOut(400, function(){
        if(tag.is(':hidden')){
          tag.fadeIn(600);
        }
      });
    });

    $(document).click(function(event){
      var verify = $(event.target).parents('.dot').length;
      console.log(verify);
      if(verify === 0){
        console.log("entro");
        $('.dot__txt').fadeOut();
      }
    });
  }
};


class Portada extends React.Component{
  render(){
    console.log("render portada");
    return <div>Soy la portadas</div>;
  }
}
class Pagina extends React.Component{
  render(){
    console.log("render pagina");
    magazine.init();
    return <div>Soy la Pagina</div>;
  }
}

class MagazineTIM extends React.Component {
    render() {

        return <div className="magazinetim">
        <Portada />
        <Pagina />
        </div>;
    }
}




if (document.getElementById("MagazineTIM") !== null && data !== null) {
    ReactDOM.render( < MagazineTIM data={data} / > , document.getElementById('MagazineTIM'));
}else{
  console.error("Debe existir el ID MagazineTIM y el Json de la información con #MagazineTIM ");
}
