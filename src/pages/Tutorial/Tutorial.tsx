import { NavLink } from "react-router-dom";

export default function Tutorial() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white/5 dark:bg-slate-900 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2">
            <img
              src="tuto1.png"
              alt="Tutoriel Spread Trading"
              className="w-full h-64 mb-4 md:h-96 rounded-lg shadow-xl object-cover border border-gray-700"
            />
            <img
              src="tuto2.png"
              alt="Tutoriel Spread Trading"
              className="w-full h-64 md:h-96 rounded-lg shadow-xl object-cover border border-gray-700"
            />
          </div>

          <div className="md:w-1/2 prose prose-invert max-w-none">
            <h1 className="text-xl mb-2">TUTO Spread Trading</h1>

            <p className="lead">
              <strong>Idée :</strong> Acheter pas cher, revendre cher, capter l'écart de prix
              entre acheteurs pressés et vendeurs rapides.
            </p>

            <h3 className="text-lg md:text-xl font-semibold mt-2">Pourquoi ça marche</h3>
            <p>
              Les joueurs pressés paient plus pour obtenir des currencies instantanément ; les
              vendeurs rapides décotent pour vendre vite. Avec du temps et de la méthode, on
              profite de ces écarts.
            </p>

            <h3 className="text-lg md:text-xl font-semibold mt-4">Étapes pratiques</h3>
            <ol>
              <li>
                <strong>Currency Exchange</strong> → Chercher un bon écart de ratio en maintenant
                 <kbd className="dark:bg-slate-800/60 ml-1 px-2 py-1.5 text-xs font-semibold text-gray-80 border border-gray-200 rounded-lg dark:text-gray-100 dark:border-gray-500">Alt</kbd> sur <em>Market Ratio</em>.
                 <br></br>
                 <div className="inline-block mt-4 mb-4 ml-2 px-2 py-0.5 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded">
                  <strong>⚠️ Bas Volumes:</strong> Les spread large sont alléchants mais évitez les, un spread très large vient souvent d'un manque de liquidité. Visez 10–30% d'écart réaliste.
                  un spread attractif sans liquidité peut rester non exécuté.
                </div>
              </li>

              <li>
                Entrer les ratios sur <a className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-600 dark:decoration-indigo-400 underline-offset-2 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors" href="https://kipavy.github.io/trade-of-exile/" target="_blank" rel="noopener noreferrer">Trade of
                Exile</a> pour calculer le prix de revient par orbe (en or) et le taux de rendement.
              </li>
            </ol>

            <h3 className="text-lg md:text-xl font-semibold mt-4">Sites utiles</h3>
            <ul>
              <li><a className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-600 dark:decoration-indigo-400 underline-offset-2 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors" href="https://poe.ninja/poe2/economy" target="_blank" rel="noopener noreferrer">poe.ninja</a>: volumes de trade</li>
              <li><a className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-600 dark:decoration-indigo-400 underline-offset-2 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors" href="https://poe2scout.com/" target="_blank" rel="noopener noreferrer">poe2scout</a>: currency tracker</li>
              <li><a className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-600 dark:decoration-indigo-400 underline-offset-2 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors" href="https://poe.watch/poe2/exchange?league=Rise%20of%20the%20Abyssal" target="_blank" rel="noopener noreferrer">poe.watch</a>: currency tracker</li>
            </ul>
            <NavLink className="inline-block mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded" to="/">Ouvrir le calculateur</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}