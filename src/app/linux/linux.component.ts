import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SnakeComponent} from './snake/snake.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-linux',
  imports: [
    CommonModule,
    SnakeComponent
  ],
  templateUrl: './linux.component.html',
  styleUrl: './linux.component.css'
})
export class LinuxComponent {
  openSnake = false;
  // textForSnake: string = "Linux, en tant que solution open source, présente de nombreux avantages tant sur le plan technique qu’éthique.\n" +
  //   "        Sa nature libre permet à chacun d’accéder au code source, de le modifier et de le redistribuer,\n" +
  //   "        favorisant ainsi la transparence, la collaboration et l’innovation collective. Contrairement aux\n" +
  //   "        systèmes propriétaires, Linux n’impose pas de licences coûteuses ni de restrictions d’usage, ce qui en fait une\n" +
  //   "        alternative économique et flexible pour les particuliers, les entreprises et les administrations.\n" +
  //   "        Sa stabilité, sa sécurité renforcée et sa gestion efficace des ressources en font un choix privilégié\n" +
  //   "        pour les serveurs, les environnements de développement et les systèmes embarqués. De plus, la vaste communauté de\n" +
  //   "        développeurs et d’utilisateurs assure une **évolution continue du système, avec des mises à jour régulières, une\n" +
  //   "        forte réactivité face aux vulnérabilités, et un écosystème riche de distributions adaptées à tous les besoins.\n" +
  //   "        En somme, Linux incarne la philosophie du logiciel libre : un outil performant, durable et accessible à tous,\n" +
  //   "        construit sur le partage et la confiance.";
  textForSnake = "aa";
}
