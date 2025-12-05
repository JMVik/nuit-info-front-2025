import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetStateService } from '../services/planet-state.service';
import {Router} from '@angular/router';

/*Déf d'une interface pour representer les établissements */
interface School {
  id: number;
  name: string;
  x: number;
  y: number;
  isConnected: boolean;
  img: string;
  color: string;
}

// Déf d'un câble
interface Link {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-tours',
  imports: [CommonModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})


export class ToursComponent {

  isGameFinished = false;
  isNetworkConnected = false;
  isOptimizing = false;
  isMaxedOut = false;

  currentInfo = "Bienvenue ! Je t'expliquerai l'impact de tes choix ici.";

  nirdFacts = [
    "Mutualiser permet d'acheter moins de serveurs physiques.",
    "Moins de machines = moins de consommation électrique !",
    "L'union fait la force face aux pannes matérielles.",
    "On réduit la dépendance aux GAFAM en hébergeant localement.",
    "Partager les ressources allonge la durée de vie du matériel.",
    "La sauvegarde croisée sécurise les données scolaires."];

  // Configuration des écoles (positions fixes pour le dessin)
schools: School[] = [
  { id: 1, name: 'Collège Coat Mez', x: 8, y: 28, isConnected: false, img: 'lycee.png', color: '#e73cc8ff' },
  { id: 2, name: 'Collège Victor Vasarely', x: 49, y: 30, isConnected: false, img: 'lycee.png', color: '#3498db' },
  { id: 3, name: 'Collège des 7 vallées', x: 52, y: 6, isConnected: false, img: 'lycee.png', color: '#3ce76dff' },
  { id: 4, name: 'École élémentaire Louis Barrié', x: 70, y: 70, isConnected: false, img: 'lycee.png', color: '#058339ff' },
  { id: 5, name: 'Lycée des métiers Heinrich-Nessel', x: 50, y: 60, isConnected: false, img: 'lycee.png', color: '#e74c3c' },
  { id: 6, name: 'UFR math-info Unistra', x: 85, y: 30, isConnected: false, img: 'lycee.png', color: '#5b3ce7ff' }
];

  links: Link[] = [];
  selectedSchool: School | null = null;

  // Stats du NIRD
  co2Saved = 0;
  moneySaved = 0;

  constructor(private planetState: PlanetStateService, private router: Router) {
  }

  fermerPopup() {
    this.planetState.increment(1);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  selectSchool(school: School) {
    if (this.isMaxedOut) {
      return;
    }
    if (this.isNetworkConnected && !this.isOptimizing) {
      return;
    }

    if (this.selectedSchool === school) {
      this.selectedSchool = null;
      return;
    }

    if (!this.selectedSchool) {
      this.selectedSchool = school;
    } else {

     const linkAlreadyExists = this.links.some(link => {
        const sens1 = (link.x1 === this.selectedSchool!.x && link.y1 === this.selectedSchool!.y &&
                       link.x2 === school.x && link.y2 === school.y);
        const sens2 = (link.x1 === school.x && link.y1 === school.y &&
                       link.x2 === this.selectedSchool!.x && link.y2 === this.selectedSchool!.y);
        return sens1 || sens2;
      });

      if (linkAlreadyExists) {
        // Si le lien existe, on annule la sélection et on ne fait rien
        this.selectedSchool = null;
        return;
      }

      // ------------------------------------

      this.createLink(this.selectedSchool, school);
      this.selectedSchool = null;
    }
  }

  createLink(start: School, end: School) {
    this.links.push({
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    });

    // MAJ le statut
    start.isConnected = true;
    end.isConnected = true;

    const randomIndex = Math.floor(Math.random() * this.nirdFacts.length);
    this.currentInfo = this.nirdFacts[randomIndex];

    //Caluler les gains
    this.updateStats();

    this.checkState();

  }

  updateStats() {
    // Chaque connexion rapporte des points NIRD
    this.co2Saved += 150; // kg CO2
    this.moneySaved += 2000; // Euros
  }

  checkState() {
    const allConnected = this.schools.every(s => s.isConnected);
    const minLinks = this.links.length >= this.schools.length - 1;

    if (allConnected && minLinks && !this.isNetworkConnected) {
      this.isNetworkConnected = true;
    }

    if (this.links.length >= 15) {
        this.isMaxedOut = true;
        this.isNetworkConnected = true;
        this.isOptimizing = false;
    }
  }

  // Appelée par le bouton "optimiser"
  startOptimization() {
    this.isOptimizing = true;
    this.planetState.increment(1);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
