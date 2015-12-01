var score = new Number;
var score_container;

var instructions;
var instructions_container;

var letter;
var previous_letter;
var letter_container;
var unordered_list;
var main_container;

var alphabet = new String;
var alphabet_array = new Array;
var number_of_letters = new Number;
var array_of_list_elements = new Array;

var timer;
var timer_container;
var number_of_seconds = new Number;
var start_button;
var reset;
var update_score;

var dark_blue = '#039cde';
var light_blue = '#f4fafc';

var dark_grey = '#393939';
var light_white = '#fdfdfd';

var dark_yellow = '#f8d856';
var light_yellow = '#f8efcd';

var dark_green = '#2cc3a5';
var light_green = '#66d45b';

var dark_red = '#e85c67';
var light_red = '#ED7882';


var reset_timer = function(){
      clearInterval(timer);
      clearInterval(update_score);
      score_container.textContent = 'Score: ' + check_color_status('green');

      number_of_seconds = 10;
        
}

var rest_all_drag_events = function(value){
    
    array_of_list_elements = document.getElementsByTagName('li');
    
    for(var i=0; i< array_of_list_elements.length; i++){
            array_of_list_elements[i].setAttribute('draggable',value);
        };
};


var count_down = function(){
        
        if(number_of_seconds <= 0){
            timer_container.textContent = 'Time Up!';
            reset_timer();
            start_button.style.display = 'block';
            rest_all_drag_events(false);
        }else{
            timer_container.textContent = 'Timer: ' + number_of_seconds;
            number_of_seconds--;

        }
};




var check_score = function(){
    score = check_color_status('green');
    score_container.textContent = 'Score: ' + score;
}



var check_color_status = function(color_to_check){
    return document.getElementsByClassName(color_to_check).length;
}




document.addEventListener('DOMContentLoaded',function(event){
    
    
   alphabet = 'abcdefghijklmnopqrstuvwxyz';
   alphabet_array = alphabet.split(''); 
   
   number_of_letters = alphabet_array.length;
   

   main_container = document.createElement('main');
    
    start_button = document.createElement('button');
    start_button.setAttribute('id','start_button');
    start_button.textContent = 'Start Game';
    
    
   instructions_container = document.createElement('section');
   instructions = document.createElement('p');
    
   score_container = document.createElement('span');
    score_container.setAttribute('id','score_container');
   letter_container = document.createElement('ul');

   timer_container = document.createElement('span');
   timer_container.setAttribute('id','timer_container');
    
    
    
    
    document.body.appendChild(main_container);
    main_container.appendChild(instructions_container);
    
    instructions_container.appendChild(instructions);
    instructions_container.appendChild(instructions);
    instructions.innerHTML = 'Drag And Drop The Letters To Turn Them <mark>Green</mark> Before Time Runs Out';
    
    instructions_container.appendChild(start_button);
    
    instructions_container.appendChild(timer_container);
    instructions_container.appendChild(score_container);
    
    
    main_container.appendChild(letter_container);
    
    reset_timer();
    timer_container.textContent = 'Timer: Press Start';
    
    start_button.addEventListener('click',function(event){
         
           timer = setInterval(count_down,1000);
           update_score = setInterval(check_score,500);
           start_button.style.display = 'none';
           rest_all_drag_events(true);
    });
    
    
   for(var i=0; i < number_of_letters; i++){
       
       letter = document.createElement('li');
       letter.textContent = alphabet_array[i];
       
       
       //Set Drag Properties
       letter.setAttribute('draggable','true');
       letter.className = 'default';
       
       //Set Drag Listeners
       letter.addEventListener('dragstart',function(event){
           previous_letter = event.target;
           
           event.dataTransfer.setData('text', event.target.textContent);

           event.target.style.backgroundColor = dark_blue;
           event.target.style.color = light_white;
       });
       
       
       letter.addEventListener('dragend',function(event){
           event.target.style.backgroundColor = dark_blue;
           event.target.style.color = light_white;
           event.target.style.borderColor = dark_blue;
           event.target.className = 'blue';


       });
       
       letter.addEventListener('dragenter',function(event){
           event.target.style.backgroundColor = dark_yellow;
           event.target.style.color = light_white;
           event.target.style.borderColor = light_yellow;
           event.target.className = 'yellow';

       });
       
       letter.addEventListener('dragleave',function(event){
           event.target.style.backgroundColor = dark_red;
           event.target.style.color = light_white;
           event.target.style.borderColor = light_red;
           event.target.className = 'red';


       });
       
       
       
       letter.addEventListener('dragover',function(event){
          event.preventDefault(); 
       });
       
       letter.addEventListener('drop',function(event){
           
           event.preventDefault();

           previous_letter.textContent = event.target.textContent;
           event.target.textContent = event.dataTransfer.getData('text');
           
           
           event.target.style.backgroundColor = light_green;
           event.target.style.borderColor = dark_green;
           event.target.className = 'green';
           check_color_status('green');
          

       });
       
       letter_container.appendChild(letter);
   } 
    
    
    
    
});